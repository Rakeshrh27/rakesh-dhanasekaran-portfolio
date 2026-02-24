'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function ResumeUpdatePage() {
    const [isSaving, setIsSaving] = useState(false)
    const [activeAction, setActiveAction] = useState(null)
    const [versions, setVersions] = useState([])
    const [uploadNotes, setUploadNotes] = useState('Manual synchronization protocol override')
    const [uploadVersion, setUploadVersion] = useState('')
    const [uploadFilename, setUploadFilename] = useState('')
    const fileInputRef = useRef(null)

    // Load from API on mount
    useEffect(() => {
        fetchMetadata()
    }, [])

    useEffect(() => {
        if (versions.length > 0 && !uploadVersion) {
            const lastVer = parseInt(versions[0].id.split('.')[1]) || 0
            const nextVer = `v3.${lastVer + 1}`
            setUploadVersion(nextVer)
            setUploadFilename(`resume-${nextVer}.pdf`)
        } else if (versions.length === 0 && !uploadVersion) {
            setUploadVersion('v3.1')
            setUploadFilename('resume-v3.1.pdf')
        }
    }, [versions, uploadVersion])

    const fetchMetadata = async () => {
        try {
            const response = await fetch('/api/resume/metadata')
            if (response.ok) {
                const data = await response.json()
                setVersions(data)
            }
        } catch (error) {
            console.error('Failed to fetch metadata')
        }
    }

    const saveMetadata = async (newVersions) => {
        try {
            await fetch('/api/resume/metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVersions)
            })
            setVersions(newVersions)
        } catch (error) {
            console.error('Failed to save metadata')
        }
    }

    const updateVersionNotes = async (id, newNotes) => {
        const newVersions = versions.map(v => v.id === id ? { ...v, notes: newNotes } : v)
        await saveMetadata(newVersions)
    }

    const updateVersionFilename = async (id, newFilename) => {
        const version = versions.find(v => v.id === id)
        if (!version || version.filename === newFilename) return

        setIsSaving(true)
        try {
            const res = await fetch('/api/resume/rename', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldFilename: version.filename,
                    newFilename: newFilename
                })
            })

            if (res.ok) {
                const newVersions = versions.map(v => v.id === id ? { ...v, filename: newFilename } : v)
                await saveMetadata(newVersions)
            } else {
                const error = await res.json()
                alert(error.error || 'Failed to rename file')
            }
        } catch (error) {
            console.error('Failed to rename')
        } finally {
            setIsSaving(false)
        }
    }

    const toggleActive = async (id) => {
        const version = versions.find(v => v.id === id)
        if (!version) return

        setIsSaving(true)
        try {
            // 1. Sync file to public/resume.pdf
            const syncRes = await fetch('/api/resume/set-active', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: version.filename })
            })

            if (syncRes.ok) {
                // 2. Update metadata
                const newVersions = versions.map(v => ({
                    ...v,
                    status: v.id === id ? 'active' : 'archived'
                }))
                await saveMetadata(newVersions)
            }
        } catch (error) {
            console.error('Failed to set active')
        } finally {
            setIsSaving(false)
        }
    }

    const deleteVersion = async (id, e) => {
        e.stopPropagation()
        const versionToDelete = versions.find(v => v.id === id)
        if (!versionToDelete) return

        // if (versionToDelete.status === 'active') {
        //     alert("Cannot delete the active production version. Set another version as active first.")
        //     return
        // }

        if (confirm(`Are you sure you want to permanently delete ${id}?`)) {
            setIsSaving(true)
            try {
                // 1. Delete file from disk
                await fetch('/api/resume/delete', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: versionToDelete.filename })
                })

                // 2. Update metadata
                const newVersions = versions.filter(v => v.id !== id)
                await saveMetadata(newVersions)
            } catch (error) {
                console.error('Failed to delete')
            } finally {
                setIsSaving(false)
            }
        }
    }

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsSaving(true)
        try {
            const nextId = uploadVersion || `v3.${(parseInt(versions[0]?.id.split('.')[1]) || 0) + 1}`
            let customName = uploadFilename || `resume-${nextId}.pdf`
            if (!customName.toLowerCase().endsWith('.pdf')) customName += '.pdf'

            // 1. Upload to server
            const formData = new FormData()
            formData.append('file', file)
            formData.append('version', nextId)
            formData.append('filename', customName)

            const uploadRes = await fetch('/api/resume/upload', {
                method: 'POST',
                body: formData
            })

            if (uploadRes.ok) {
                const uploadData = await uploadRes.json()

                // 2. Add to metadata and set as active automatically
                const newVersions = [
                    {
                        id: nextId,
                        date: new Date().toISOString().split('T')[0],
                        size: uploadData.size,
                        status: 'active',
                        notes: uploadNotes,
                        filename: uploadData.filename
                    },
                    ...versions.map(v => ({ ...v, status: 'archived' }))
                ]

                // 3. Set the newly uploaded file as production active
                await fetch('/api/resume/set-active', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: uploadData.filename })
                })

                await saveMetadata(newVersions)

                // Reset inputs
                const nextSuffix = (parseInt(nextId.split('.')[1]) || 0) + 1
                const nextVer = `v3.${nextSuffix}`
                setUploadVersion(nextVer)
                setUploadFilename(`resume-${nextVer}.pdf`)
                setUploadNotes('Manual synchronization protocol override')
            }
        } catch (error) {
            console.error('Upload failed')
        } finally {
            setIsSaving(false)
            e.target.value = '' // Reset input
        }
    }

    const runQuickAction = (action) => {
        setActiveAction(action)
        setTimeout(() => setActiveAction(null), 2000)
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-background selection:bg-primary/20">
            <div className="max-w-6xl mx-auto">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileSelect}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl opacity-50 rounded-3xl" />

                    <Card className="relative glass border-primary/20 p-8 md:p-12 overflow-hidden">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] uppercase font-black tracking-widest text-primary/60">Secure Management Protocol</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gradient">
                                    Resume Core <span className="text-foreground">{uploadVersion}</span>
                                </h1>
                            </div>
                            <div className="flex flex-col items-end">
                                <Badge variant="glass" className="mb-2 bg-primary/10 text-primary border-primary/20 uppercase tracking-widest text-[9px] font-black">
                                    Status: {isSaving ? 'Synchronizing...' : 'Ready'}
                                </Badge>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase">ID: 0xRAK-27-EXP</p>
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-8 flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-primary/60 tracking-widest ml-4">Deployment Version ID</label>
                                            <input
                                                className="w-full bg-black/40 border border-primary/20 rounded-2xl px-6 py-4 outline-none focus:border-primary/60 transition-all font-mono text-sm leading-relaxed"
                                                value={uploadVersion}
                                                onChange={(e) => setUploadVersion(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase text-primary/60 tracking-widest ml-4">Target Asset Filename</label>
                                            <input
                                                className="w-full bg-black/40 border border-primary/20 rounded-2xl px-6 py-4 outline-none focus:border-primary/60 transition-all font-mono text-sm leading-relaxed"
                                                placeholder="e.g. Rakesh-Dhanasekaran-CV.pdf"
                                                value={uploadFilename}
                                                onChange={(e) => setUploadFilename(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-primary/60 tracking-widest ml-4">Master Documentation Release Notes</label>
                                        <textarea
                                            className="w-full h-32 bg-black/40 border border-primary/20 rounded-[2rem] p-6 outline-none focus:border-primary/60 transition-all font-mono text-sm leading-relaxed"
                                            value={uploadNotes}
                                            onChange={(e) => setUploadNotes(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className="h-48 rounded-[2rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center bg-primary/5 group cursor-pointer hover:bg-primary/10 transition-all duration-500 hover:border-primary/40 relative overflow-hidden"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <motion.div
                                            animate={isSaving ? { rotate: 360 } : { y: [0, -10, 0] }}
                                            transition={isSaving ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                                        >
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        </motion.div>
                                        <span className="text-xs font-black text-foreground uppercase tracking-widest text-center px-10">
                                            {isSaving ? 'Executing Binary Write...' : 'Commit Source & Upload binary'}
                                        </span>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 p-8 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col justify-center">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Quick Actions</h3>
                                    <div className="space-y-3">
                                        {['Flush CDN Cache', 'Notify Recruiters', 'Rebuild Metadata'].map(action => (
                                            <button
                                                key={action}
                                                onClick={() => runQuickAction(action)}
                                                disabled={!!activeAction}
                                                className="w-full text-[10px] font-bold uppercase tracking-wider text-primary/80 hover:text-primary hover:bg-primary/5 p-3 rounded-xl transition-all flex items-center justify-between group disabled:opacity-50"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className={cn("w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors", activeAction === action && "bg-green-500 animate-ping")} />
                                                    {action}
                                                </span>
                                                {activeAction === action && <span className="text-[8px] text-green-500 font-mono">EXECUTING...</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    Version Repository (JSON Linked Repository)
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {versions.map((version) => (
                                        <motion.div
                                            key={version.id}
                                            layout
                                            className={cn(
                                                "p-8 rounded-[2rem] border transition-all duration-500 relative group cursor-pointer",
                                                version.status === 'active'
                                                    ? "bg-primary/10 border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                                                    : "bg-muted/10 border-border/50 hover:border-primary/30"
                                            )}
                                            onClick={() => version.status !== 'active' && toggleActive(version.id)}
                                        >
                                            <button
                                                onClick={(e) => deleteVersion(version.id, e)}
                                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                                title="Permanently Delete version"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>

                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-black tracking-tighter">{version.id}</span>
                                                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{version.date}</span>
                                                </div>
                                                {version.status === 'active' ? (
                                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse" />
                                                ) : (
                                                    <div className="w-3 h-3 rounded-full bg-muted/30" />
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1 mb-6">
                                                <label className="text-[10px] font-black uppercase text-primary/40 tracking-widest">Asset Name</label>
                                                <input
                                                    className="w-full bg-transparent border-none p-0 text-[10px] font-mono text-primary/80 outline-none focus:text-primary transition-all cursor-text"
                                                    defaultValue={version.filename}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onBlur={(e) => updateVersionFilename(version.id, e.target.value)}
                                                />
                                            </div>

                                            <textarea
                                                className="w-full bg-transparent border-none p-0 text-sm text-muted-foreground leading-relaxed mb-6 h-10 line-clamp-2 resize-none outline-none focus:text-foreground focus:line-clamp-none transition-all cursor-text"
                                                defaultValue={version.notes}
                                                onClick={(e) => e.stopPropagation()}
                                                onBlur={(e) => updateVersionNotes(version.id, e.target.value)}
                                            />

                                            <div className="flex items-center justify-between">
                                                <Badge variant="glass" className={cn(
                                                    "text-[9px] py-0 px-2 uppercase font-black tracking-tighter",
                                                    version.status === 'active' ? "bg-green-500/20 text-green-500 border-green-500/20" : "bg-muted text-muted-foreground border-transparent"
                                                )}>
                                                    {version.status === 'active' ? 'Production' : 'Archived'}
                                                </Badge>
                                                <span className="text-[10px] font-black text-primary/40 group-hover:text-primary transition-colors">
                                                    {version.status === 'active' ? 'Active' : 'Set as Active →'}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

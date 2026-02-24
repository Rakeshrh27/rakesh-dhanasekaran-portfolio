import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const version = formData.get('version');
        const requestedFilename = formData.get('filename');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists
        const uploadsDir = path.join(process.cwd(), 'public/resumes');
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        // Use requested filename or fallback
        let filename = requestedFilename || `resume-${version}.pdf`;

        // Safety check for filename uniqueness on the storage layer
        let finalPath = path.join(uploadsDir, filename);
        if (requestedFilename) {
            // If user specified a name, check if it exists (but usually user will manage this from UI)
            // We allow overwriting if it's the same name, or we could add a timestamp if preferred
            // For this professional flow, we trust the dashboard naming
        } else {
            filename = `resume-${version}-${Date.now()}.pdf`;
            finalPath = path.join(uploadsDir, filename);
        }

        await fs.writeFile(finalPath, buffer);

        return NextResponse.json({
            success: true,
            filename,
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}

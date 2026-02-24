import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { oldFilename, newFilename } = await request.json();
        if (!oldFilename || !newFilename) {
            return NextResponse.json({ error: 'Missing filenames' }, { status: 400 });
        }

        const resumesDir = path.join(process.cwd(), 'public/resumes');
        const oldPath = path.join(resumesDir, oldFilename);
        const newPath = path.join(resumesDir, newFilename);

        // Check if new filename already exists
        try {
            await fs.access(newPath);
            return NextResponse.json({ error: 'New filename already exists' }, { status: 400 });
        } catch {
            // New file doesn't exist, which is good
        }

        await fs.rename(oldPath, newPath);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Rename error:', error);
        return NextResponse.json({ error: 'Failed to rename file' }, { status: 500 });
    }
}

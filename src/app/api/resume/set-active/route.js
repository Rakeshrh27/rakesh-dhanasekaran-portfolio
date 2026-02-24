import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { filename } = await request.json();
        if (!filename) return NextResponse.json({ error: 'No filename provided' }, { status: 400 });

        const sourcePath = path.join(process.cwd(), 'public/resumes', filename);
        const destinationPath = path.join(process.cwd(), 'public/resume.pdf');

        await fs.copyFile(sourcePath, destinationPath);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Set active error:', error);
        return NextResponse.json({ error: 'Failed to set active resume' }, { status: 500 });
    }
}

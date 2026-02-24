import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        const { filename } = await request.json();
        if (!filename) return NextResponse.json({ error: 'No filename provided' }, { status: 400 });

        const filePath = path.join(process.cwd(), 'public/resumes', filename);

        try {
            await fs.unlink(filePath);
        } catch (e) {
            console.warn('File might not exist on disk:', filename);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
    }
}

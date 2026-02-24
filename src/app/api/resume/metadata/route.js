import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const METADATA_PATH = path.join(process.cwd(), 'src/data/resume-metadata.json');

export async function GET() {
    try {
        const data = await fs.readFile(METADATA_PATH, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json([], { status: 404 });
    }
}

export async function POST(request) {
    try {
        const newMetadata = await request.json();
        await fs.writeFile(METADATA_PATH, JSON.stringify(newMetadata, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update metadata' }, { status: 500 });
    }
}

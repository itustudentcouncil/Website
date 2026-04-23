import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const contentPath = searchParams.get('path');

    if (!contentPath) {
        return NextResponse.json({ error: 'Content path is required' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://cdn.studentcouncil.dk/${contentPath}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch content' }, { status: response.status });
        }

        const content = await response.text();
        
        return new NextResponse(content, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error) {
        console.error('Error fetching MDX content:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

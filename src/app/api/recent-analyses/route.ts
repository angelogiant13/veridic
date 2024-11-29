import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        {
            id: '1',
            documentName: 'Service Agreement - TechCorp',
            riskScore: 85,
            date: '2024-03-20'
        },
        {
            id: '2',
            documentName: 'NDA - Innovation Labs',
            riskScore: 45,
            date: '2024-03-19'
        },
        {
            id: '3',
            documentName: 'License Agreement - DataFlow',
            riskScore: 92,
            date: '2024-03-18'
        }
    ]);
}

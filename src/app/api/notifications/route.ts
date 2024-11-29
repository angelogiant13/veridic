import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        {
            id: '1',
            type: 'risk',
            message: 'High risk detected in TechCorp agreement',
            timestamp: '2024-03-20T10:30:00Z'
        },
        {
            id: '2',
            type: 'update',
            message: 'Analysis completed for DataFlow license',
            timestamp: '2024-03-20T09:15:00Z'
        },
        {
            id: '3',
            type: 'upload',
            message: 'New contract uploaded: Innovation Labs NDA',
            timestamp: '2024-03-19T16:45:00Z'
        }
    ]);
}

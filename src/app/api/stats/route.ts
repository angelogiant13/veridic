import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        total_contracts: 156,
        high_risk_contracts: 8,
        resolved_issues: 42,
        pending_review: 15
    });
}

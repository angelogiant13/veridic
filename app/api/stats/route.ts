import { NextResponse } from 'next/server';

export async function GET() {
    const mockStats = {
        totalContracts: 156,
        contractsChange: "+12 this month",
        highRiskContracts: 8,
        highRiskChange: "3 new this week",
        resolvedIssues: 42,
        resolutionRate: "85% resolution rate",
        pendingReview: 15,
        urgentItems: "5 urgent items"
    };

    return NextResponse.json(mockStats);
}

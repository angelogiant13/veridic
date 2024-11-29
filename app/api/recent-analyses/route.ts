import { NextResponse } from 'next/server';

export async function GET() {
    const mockAnalyses = {
        analyses: [
            {
                id: 1,
                documentName: "Contract_2024_Q1.pdf",
                riskScore: 85,
                analysisDate: "2024-03-15",
                status: "High Risk"
            },
            {
                id: 2,
                documentName: "Agreement_Tech_Services.pdf",
                riskScore: 45,
                analysisDate: "2024-03-14",
                status: "Medium Risk"
            },
            {
                id: 3,
                documentName: "NDA_Partner_2024.pdf",
                riskScore: 20,
                analysisDate: "2024-03-13",
                status: "Low Risk"
            }
        ]
    };

    return NextResponse.json(mockAnalyses);
}

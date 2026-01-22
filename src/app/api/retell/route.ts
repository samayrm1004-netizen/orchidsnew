//c:\cosmosai\orchidsnew\src\app\api\retell\route.ts
import { NextRequest, NextResponse } from "next/server";

const RETELL_API_KEYS = {
    english: process.env.RETELL_API_KEY_ENGLISH,
    hindi: process.env.RETELL_API_KEY_HINDI,
};

const AGENT_IDS = {
    english: process.env.NEXT_PUBLIC_RETELL_AGENT_ID_ENGLISH,
    hindi: process.env.NEXT_PUBLIC_RETELL_AGENT_ID_HINDI,
};

export async function POST(request: NextRequest) {
    try {
        const { language } = await request.json();

        // Validate language
        if (!language || !["english", "hindi"].includes(language)) {
            return NextResponse.json(
                { error: "Invalid language. Must be 'english' or 'hindi'" },
                { status: 400 }
            );
        }

        const apiKey = RETELL_API_KEYS[language as keyof typeof RETELL_API_KEYS];
        const agentId = AGENT_IDS[language as keyof typeof AGENT_IDS];

        if (!apiKey || !agentId) {
            console.error("Missing Retell configuration for language:", language);
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Create web call with Retell API
        const response = await fetch("https://api.retellai.com/v2/create-web-call", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                agent_id: agentId,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Retell API error:", response.status, errorText);
            return NextResponse.json(
                { error: "Failed to create call" },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            access_token: data.access_token,
            call_id: data.call_id,
        });
    } catch (error) {
        console.error("Error creating Retell call:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

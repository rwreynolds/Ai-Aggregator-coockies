// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/settings - Get user settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userSettings = await prisma.settings.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!userSettings) {
      return NextResponse.json(
        { message: "Settings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ settings: userSettings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching settings" },
      { status: 500 }
    );
  }
}

// POST /api/settings - Update user settings
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { defaultService, defaultModel, temperature, maxTokens, defaultAssistantId } = body;

    // Update or create settings
    const userSettings = await prisma.settings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        defaultService,
        defaultModel,
        temperature,
        maxTokens,
        defaultAssistantId,
      },
      create: {
        userId: session.user.id,
        defaultService,
        defaultModel,
        temperature,
        maxTokens,
        defaultAssistantId,
      },
    });

    return NextResponse.json({
      message: "Settings updated successfully",
      settings: userSettings
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { message: "An error occurred while updating settings" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3).max(32),
  password: z.string().min(4),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues.map((i) => i.message) },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(result.data.password);
    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { token: generateToken(user.id) },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

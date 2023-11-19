import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  // To prevent caching, we add this request object
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validate
  // If invalid, return 400
  // Else, return

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existingUser)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const user = await prisma.user.create({
    data: { name: body.name, email: body.email },
  });
  return NextResponse.json(user, { status: 201 });
}

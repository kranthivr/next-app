import { NextRequest, NextResponse } from "next/server";

import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch data from a db
  // If not found, return 404 error
  // Else return data

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();
  // If invalid, return 400

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch the user with the given id
  // If doesn't exist, return 404

  const existingUser = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!existingUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Update the user
  // Return the updated user

  const updatedUser = await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch user form db
  // If not found, return 404

  const existingUser = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!existingUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Delete the user
  // Return 200
  await prisma.user.delete({
    where: { id: existingUser.id },
  });

  return NextResponse.json({});
}

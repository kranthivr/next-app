import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email({ message: "Not a valid email." }),
  oldPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
  reEnterPassword: z
    .string()
    .min(8, { message: "Password must be minimum 8 charaters" })
    .max(15, { message: "Password must not be more than 15 characters" }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user)
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });

  const oldPasswordsMatch = await bcrypt.compare(
    body.oldPassword,
    user.hashedPassword!
  );

  if (!oldPasswordsMatch)
    return NextResponse.json(
      { error: "Old Password is wrong" },
      { status: 400 }
    );

  const newPasswordsMatch = body.newPassword === body.reEnterPassword;

  if (!newPasswordsMatch)
    return NextResponse.json(
      { error: "New Passwords don't match" },
      { status: 400 }
    );

  const hashedNewPassword = await bcrypt.hash(body.newPassword, 10);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      hashedPassword: hashedNewPassword,
    },
  });

  return NextResponse.json({ email: updatedUser.email });
}

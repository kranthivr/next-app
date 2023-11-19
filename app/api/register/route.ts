import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters." })
    .regex(new RegExp("^[a-zA-Z]+$"), {
      message: "Name should contain only alphabets",
    }),
  email: z.string().email({ message: "Not a valid email." }),
  password: z
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
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword,
    },
  });

  return NextResponse.json({ email: newUser.email });
}

import User from "@/models/UserModel";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (request: NextRequest) => {
  const { email, password, name } = await request.json();
  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email is already registered", {
      status: 400,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User is registered successfully", {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};

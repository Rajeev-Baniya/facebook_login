// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '../../../../lib/mongoose';
import { User } from '../../../../models/User';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    await connectToDB();

    const newUser = await User.create({ email, password });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

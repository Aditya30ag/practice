import { NextResponse } from 'next/server';
import { executeQuery } from '@/libs/db';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

// Validation schema
const signupSchema = z.object({
  name:z.string().min(6, 'name must be at least 6 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = signupSchema.parse(body);
    const { name,email, password } = validatedData;

    // Check if user exists
    const existingUser = await executeQuery({
      query: 'SELECT email FROM users WHERE email = ?',
      values: [email],
    });

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const result = await executeQuery({
      query: 'INSERT INTO users (name,email, password) VALUES (?,?, ?)',
      values: [name,email, hashedPassword],
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully',
        userId: result.insertId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
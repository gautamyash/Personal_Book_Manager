import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

type JwtPayload = {
  userId: string;
  email: string;
};

async function getUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const book = await Book.findOne({
      _id: id,
      userId,
    });

    if (!book) {
      return NextResponse.json({ message: "Book not found." }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { title, author, tags, status } = await req.json();

    const book = await Book.findOneAndUpdate(
      {
        _id: id,
        userId,
      },
      {
        title,
        author,
        tags,
        status,
      },
      {
        new: true,
      },
    );

    if (!book) {
      return NextResponse.json({ message: "Book not found." }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const book = await Book.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!book) {
      return NextResponse.json({ message: "Book not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

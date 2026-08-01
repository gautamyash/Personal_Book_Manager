import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import Book from "@/models/Book";

type JwtPayload = {
  userId: string;
  email: string;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const { title, author, tags, status } = await req.json();

    if (!title || !author) {
      return NextResponse.json(
        {
          message: "Title and author are required.",
        },
        {
          status: 400,
        },
      );
    }

    const book = await Book.create({
      userId: decoded.userId,
      title,
      author,
      tags: tags || [],
      status: status || "want",
    });

    return NextResponse.json(book, {
      status: 201,
    });
  } catch (error) {
    console.error("Create Book Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const tag = searchParams.get("tag");

    const query: any = {
      userId: decoded.userId,
    };

    if (status) {
      query.status = status;
    }

    if (tag) {
      query.tags = tag;
    }

    const books = await Book.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json(books, {
      status: 200,
    });
  } catch (error) {
    console.error("Get Books Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

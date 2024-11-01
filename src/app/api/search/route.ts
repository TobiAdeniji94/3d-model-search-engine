import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    // Search products based on name or description
    const products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: query.toLowerCase() } },
          { description: { contains: query.toLowerCase() } }
        ],
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

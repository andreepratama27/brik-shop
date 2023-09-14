import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as File;

  if (!file)
    NextResponse.json({
      success: false,
      message: "No image attached",
    });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/upload/${file.name}`;
  await writeFile(path, buffer);

  return NextResponse.json({
    success: true,
    message: "File successfully uploaded",
  });
}

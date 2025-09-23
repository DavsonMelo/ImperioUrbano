import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Código da sala é obrigatório" },
        { status: 400 }
      );
    }

    // cria a sala com GameState vazio
    const room = await prisma.room.create({
      data: {
        code,
        gameState: {
          create: {},
        },
      },
      include: {
        gameState: true,
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar sala:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "L'id du pokemon est manquant" },
        { status: 400 }
      );
    }

    const pokemon = await prisma.pokemon.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!pokemon) {
      return NextResponse.json(
        { error: "Le pokemon n'existe pas" },
        { status: 404 }
      );
    }

    return NextResponse.json(pokemon, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    const errorMessage =
      "Le pokemon n'a pas pu être récupéré du pokedex verifier les données";
    return NextResponse.json(
      { err: err, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "L'id du pokemon est manquant" },
        { status: 400 }
      );
    }

    const pokemon = await prisma.pokemon.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(pokemon, { status: 200 });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    const errorMessage =
      "Le pokemon n'a pas pu être supprimé du pokedex verifier les données";
    return NextResponse.json(
      { err: err, message: errorMessage },
      { status: 500 }
    );
  }
}

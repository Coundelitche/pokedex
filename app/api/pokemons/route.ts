import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const pokemonSchema = z.object({
  name: z.string().min(3).max(32),
  hp: z.number().min(1).max(100),
  cp: z.number().min(1).max(100),
  type: z.array(z.string().min(1).max(32)),
  image: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = pokemonSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues.map((i) => i.message) },
        { status: 400 }
      );
    }

    const pokemon = await prisma.pokemon.create({
      data: {
        name: result.data.name,
        hp: result.data.hp,
        cp: result.data.cp,
        type: result.data.type,
        image: result.data.image,
      },
    });

    return NextResponse.json(pokemon, { status: 201 });
  } catch (err) {
    const errorMessage =
      "Le pokemon n'a pas pu être ajoute au pokedex verifier les données";
    return NextResponse.json(
      { err: err, message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";

    if (name) {
      const pokemon = await prisma.pokemon.findFirst({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });

      if (!name) {
        return NextResponse.json(
          { error: "Le nom du pokemon est manquant" },
          { status: 400 }
        );
      }

      return NextResponse.json(pokemon, { status: 200 });
    }

    const pokemons = await prisma.pokemon.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(pokemons, { status: 200 });
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    const result = pokemonSchema.partial().safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues.map((i) => i.message) },
        { status: 400 }
      );
    }

    const pokemon = await prisma.pokemon.update({
      where: {
        id: id,
      },
      data,
    });

    return NextResponse.json(pokemon, { status: 200 });
  } catch (err) {
    const errorMessage =
      "Le pokemon n'a pas pu être ajoute au pokedex verifier les données";

    return NextResponse.json(
      { err: err, message: errorMessage },
      { status: 500 }
    );
  }
}

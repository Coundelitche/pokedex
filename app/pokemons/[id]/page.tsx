"use client";
import { PokedexLayout } from "@/prisma/components/pokedexLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchPokemon(id: string) {
  const res = await fetch(`/api/pokemons/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  return res.json();
}

export default function PokedexPage() {
  const params = useParams();

  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemons", params.id],
    queryFn: () => fetchPokemon(params.id as string),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <PokedexLayout
        name={pokemon.name}
        hp={pokemon.hp}
        cp={pokemon.cp}
        types={pokemon.type}
        image={pokemon.image}
        id={pokemon.id}
      />
    </div>
  );
}

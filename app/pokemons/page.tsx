"use client";
import { PokedexHomeLayout } from "@/prisma/components/pokedexHomeLayout";
import { useQuery } from "@tanstack/react-query";

async function fetchPokemonsNames() {
  const res = await fetch(`/api/pokemons`);
  if (!res.ok) {
    throw new Error("Failed to fetch pokemon");
  }
  const data = await res.json();
  return data;
}

export default function PokedexHomePage() {
  const { data: pokemons, isLoading } = useQuery({
    queryKey: ["pokemonsNames"],
    queryFn: fetchPokemonsNames,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <PokedexHomeLayout pokemonList={pokemons} />
    </div>
  );
}

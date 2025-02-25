"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
  const { data: pokemons } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => (await fetch("/api/pokemons")).json(),
  });
  console.log(pokemons);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <Link href="/pokemons">
        <Button className="bg-red-600 p-12 text-2xl">Acceder au Pokédex</Button>
      </Link>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PokemonSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      const res = await fetch(`/api/pokemons?name=${search}`);
      if (!res.ok) {
        throw new Error("Failed to fetch pokemon");
      }
      const data = await res.json();
      const id = data.id;

      router.push(`/pokemons/${id}`);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Input
        type="text"
        placeholder="Recherche"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-2/3 h-12 bg-gray-800 text-white border-2 border-black rounded-lg p-2"
      />
      <Button
        onClick={handleSearch}
        className="w-12 h-12 bg-green-400 border-4 border-black rounded-full hover:bg-green-500 transition"
      ></Button>
    </div>
  );
};

import Link from "next/link";
import { PokemonSearch } from "./pokemonSearch";
import ArrowButtons from "./arrowButtons";

export const PokedexHomeLayout = ({
  pokemonList,
}: {
  pokemonList: { name: string; id: number }[];
}) => {
  return (
    <div className="w-full bg-red-600 flex flex-col items-center p-4 border-4 border-black rounded-lg max-w-md mx-auto">
      <div className="relative w-full h-32 bg-red-800 border-4 border-black flex items-center justify-between px-4">
        {/* Cercle bleu */}
        <div className="w-12 h-12 bg-cyan-400 border-4 border-black rounded-full"></div>

        {/* Titre Pokédex */}

        <PokemonSearch />
      </div>

      {/* Écran principal */}
      <div className="w-full h-64 bg-white border-4 border-black mt-2 relative overflow-y-scroll text-xl flex flex-col pl-4 py-2">
        {pokemonList.map((pokemon) => (
          <Link
            href={`/pokemons/${pokemon.id}`}
            key={pokemon.id}
            className="block hover:bg-green-700 transition rounded-lg p-2"
          >
            - {pokemon.name}
          </Link>
        ))}
      </div>

      {/* Panneau de contrôle */}
      <div className="w-full bg-green-600 border-4 rounded-lg border-black mt-2 p-2 text-black">
        <div className="flex justify-between border-b-2 border-black pb-1">
          <span className="font-bold">Nom</span>
          <span className="font-bold">Type</span>
        </div>
        <div className="bg-green-800 text-black p-2 mt-2 border-2 border-black">
          <p>HP</p>
          <p>CP</p>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-between w-full p-2">
        <ArrowButtons id={1} />
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-red-700 border-2 border-black rounded-full"></div>
          <div className="w-12 h-12 bg-green-700 border-2 border-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

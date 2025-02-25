import Image from "next/image";
import ArrowButtons from "./arrowButtons";
import { PokemonSearch } from "./pokemonSearch";
import Link from "next/link";

export const PokedexLayout = ({
  name,
  hp,
  cp,
  types,
  image,
  id,
}: {
  name: string;
  hp: number;
  cp: number;
  types: string[];
  image: string;
  id: number;
}) => {
  return (
    <div className="w-full bg-red-600 flex flex-col items-center p-4 border-4 border-black rounded-lg max-w-md mx-auto">
      <div className="relative w-full h-32 bg-red-800 border-4 border-black rounded-lg flex items-center justify-between px-4">
        {/* Cercle bleu */}
        <Link
          href={"/pokemons"}
          className="w-12 h-12 bg-cyan-400 border-4 border-black rounded-full hover:bg-cyan-500 transition"
        ></Link>

        {/* Titre Pokédex */}

        <PokemonSearch />
      </div>

      {/* Écran principal */}
      <div className="w-full h-64 bg-white border-4 border-black mt-2 relative flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="h-full w-auto object-contain"
          priority
        />
      </div>

      {/* Panneau de contrôle */}
      <div className="w-full bg-green-600 border-4 rounded-lg border-black mt-2 p-2 text-black">
        <div className="flex justify-between border-b-2 border-black pb-1">
          <span className="font-bold">{name}</span>
          <span className="font-bold">{types.join(", ")}</span>
        </div>
        <div className="bg-green-800 text-black p-2 mt-2 border-2 border-black">
          <p>HP: {hp}</p>
          <p>CP: {cp}</p>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-between w-full p-2">
        <ArrowButtons id={id} />
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-red-700 border-2 border-black rounded-full"></div>
          <div className="w-12 h-12 bg-green-700 border-2 border-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

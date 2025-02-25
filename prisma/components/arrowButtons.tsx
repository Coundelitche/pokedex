import Link from "next/link";

const ArrowButtons = ({ id }: { id: number }) => {
  return (
    <div className="flex gap-4">
      {/* Flèche gauche */}
      <Link href={id < 2 ? "/pokemons/1" : `/pokemons/${id - 1}`}>
        <button className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg border-2 border-black hover:bg-gray-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </Link>

      {/* Flèche droite */}
      <Link href={id > 150 ? "/pokemons/151" : `/pokemons/${id + 1}`}>
        <button className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg border-2 border-black hover:bg-gray-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default ArrowButtons;

import { prisma } from "./prisma";
import pokemons from "../data/pokemons.json";

export async function initDb() {
  try {
    console.log("🚀 Création de la base de données");

    await prisma.pokemon.deleteMany();

    await prisma.pokemon.createMany({
      data: pokemons,
    });

    console.log("✅ Base de données créée");
  } catch (err) {
    console.error("Erreur lors de la création de la base de données :", err);
  }
}
initDb().finally(() => prisma.$disconnect());

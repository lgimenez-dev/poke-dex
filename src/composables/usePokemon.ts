import { ref } from "vue";
import { pokeApi } from "@/api/pokeApi";
import type { PokemonDetail, PokemonSummary } from "@/types/pokemon";

export function usePokemon() {
  const pokemonList = ref<PokemonSummary[]>([]);
  const pokemonSearch = ref<PokemonDetail | null>(null);
  const loading = ref(false);
  const error = ref("");

  // get all pokemon
  const fetchPokemon = async () => {
    loading.value = true;
    error.value = "";
    try {
      const response = await pokeApi.get();
      pokemonList.value = response.results;
    } catch {
      error.value = "Failed to load data."
    } finally {
      loading.value = false;
    }
  };

  // get the pokemon with the name passed in the parameter
  const fetchPokemonByName = async (name: string) => {
    loading.value = true;
    error.value = "";
    pokemonSearch.value = null;
    try {
      const response = await pokeApi.getByName(name);
      pokemonSearch.value = response;
    } catch {
      error.value = "Failed to load data."
    } finally {
      loading.value = false;
    }
  };

  return {
    pokemonList,
    pokemonSearch,
    loading,
    error,
    fetchPokemon,
    fetchPokemonByName,
  };
}

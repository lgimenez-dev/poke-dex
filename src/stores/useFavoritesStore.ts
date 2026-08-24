import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@/composables/useStorage';

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = useStorage<string[]>('favoritesStorage', []);

  // get a list of favorites
  const getFavorites = computed(() => favorites.value);
  // validates if the favorite already exists in the list
  const isFavorite = computed(() => (pokemonName: string) => {
    return favorites.value.some(name => name === pokemonName);
  });

  // save a new favorite or remove the favorite from the list
  const addToFavorites = (pokemonName: string) => {
    if (!isFavorite.value(pokemonName)) {
      favorites.value.push(pokemonName);
    } else {
      favorites.value = favorites.value.filter(name => name !== pokemonName);
    }
  };

  return {
    favorites,
    getFavorites,
    isFavorite,
    addToFavorites,
  };
});
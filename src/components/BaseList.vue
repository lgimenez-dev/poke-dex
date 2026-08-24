<template>
  <div>
    <BaseCard v-for="item in pokemons" :key="item.name"
      :name="item.name"
      :favorite="favorites?.includes(item.name)"
      @selected="emit('selected', $event)"
      @add-favorite="emit('addFavorite', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import BaseCard from "./BaseCard.vue";
import type { PokemonSummary } from "@/types/pokemon";

defineProps<{
  pokemons: PokemonSummary[];
  favorites: string[];
}>();

const emit = defineEmits<{
  selected: [name: string];
  addFavorite: [name: string];
}>();
</script>

<style scoped></style>

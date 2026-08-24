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

<script setup>
import BaseCard from "./BaseCard.vue";

defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
  favorites: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['selected', 'addFavorite']);

</script>

<style scoped></style>

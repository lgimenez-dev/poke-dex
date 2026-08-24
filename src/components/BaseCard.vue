<template>
  <div class="card">
    <div class="contentCard">
      <span class="textCard" @click="emit('selected', name)">{{ name }}</span>
      <img
        class="btnAddFavorites"
        :src="favorite ? BaseIcons.starActiveIcon : BaseIcons.starInactiveIcon"
        alt="pokeball icon"
        @click="emit('addFavorite', name)"
      />
    </div>
  </div>
</template>


<script setup>
import { inject } from "vue";

const BaseIcons = inject("BaseIcons");

defineProps({
  name: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['addFavorite', 'selected']);
</script>


<style scoped>
.card {
  transition: transform 0.3s ease;
  @apply flex flex-col w-full mx-auto py-[1rem];
}
.card:hover {
  transform: scale(1.02); 
}

.contentCard {
  @apply flex justify-between items-center bg-[var(--white)] rounded-[0.5rem] h-[6rem] px-[1.5rem];
}

.textCard {
  @apply text-[2.2rem] text-[var(--darkgray)] flex-[2] text-left;
}
</style>
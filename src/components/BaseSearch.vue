<template>
  <div class="containerSearch">
    <div class="inputSearch">
      <img :src="BaseIcons.searchIcon" alt="search icon" class="iconSearch" />
      <input
        type="text"
        placeholder="Search"
        v-bind="$attrs"
        :value="value"
        @input="emit('update', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcons from "@/assets/icons/BaseIcons";

withDefaults(
  defineProps<{
    value?: string;
  }>(),
  {
    value: '',
  },
);

const emit = defineEmits<{
  update: [value: string];
}>();
</script>

<style scoped>
.containerSearch {
  @apply w-full h-full;
}
.inputSearch {
  box-shadow: 0px 2px 10px 0px var(--lightgray);
  @apply flex justify-center items-center content-center w-full h-full
   border-2 border-[1px] border-[var(--lightgray)] rounded-[5px]
   justify-evenly gap-[0.5rem];
}
.inputSearch:hover {
  box-shadow: 0px 2px 10px 0px var(--midgray);
  transition: 0.5s ease-in-out;
}
img {
  @apply ml-[0.5rem];
}
input {
  @apply w-[90%] outline-none  ;
}
</style>

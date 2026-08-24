<template>
  <div class="text-[var(--darkgray)]">
    <h1>Uh-oh!</h1>
    <p class="text-[2rem]">{{ errorMessage }}</p>
    <div class="flex justify-center mt-[3rem]">
      <div class="w-[15.5rem] h-[4.4rem]">
        <BaseButton :type="'primary'" @click="emit('backToHome')">
          Go back home
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

withDefaults(
  defineProps<{
    errorMessage?: string;
  }>(),
  {
    errorMessage: '',
  },
);

const emit = defineEmits<{
  backToHome: [];
}>();
</script>
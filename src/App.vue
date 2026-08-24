<template>
  <main class="app">
    <router-view />
  </main>
</template>

<script setup>
import { provide } from 'vue';
import BaseIcons from './assets/icons/BaseIcons.js';
import BaseImages from './assets/img/BaseImages.js';

provide('BaseIcons', BaseIcons);
provide('BaseImages', BaseImages);
</script>
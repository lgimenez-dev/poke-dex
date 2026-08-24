<template>
  <div class="containerPokemonView">
    <div class="containerHeader">
      <BaseSearch
        :value="searchField"
        @update="searchField = $event"
      />
    </div>
    <div class="containerList">
      <BaseList
        v-if="!loading"
        :pokemons="filteredList"
        :favorites="storeFavorites.getFavorites"
        @selected="handleSelectPokemon"
        @add-favorite="handleAddFavorite"
      />
      <BaseLoader v-else class="loader" />
      <BaseError
        v-if="error.length || (!filteredList.length && errorDataValue.length)"
        :error-message="error || errorDataValue"
        @back-to-home="searchField = ''"
      />
    </div>
    <div class="containerFooter">
      <div class="containerSelectors">
        <BaseButton
          :is-selected="btnAllSelected"
          :type="btnTypeAll"
          @click="handleSelectorButton"
        >
          <img :src="BaseIcons.listIcon" alt="list icon" />
          All
        </BaseButton>
        <BaseButton
          :is-selected="!btnAllSelected"
          :type="btnTypeFavorites"
          @click="handleSelectorButton"
        >
          <img :src="BaseIcons.favsIcon" alt="favs icon" />
          Favorites
        </BaseButton>
      </div>
    </div>

    <!-- modal -->
    <Teleport to="body">
      <BaseModal
        v-if="showModal"
        :image="selected.image"
        :name="selected.name"
        :weight="selected.weight"
        :height="selected.height"
        :types="selected.types"
        :is-favorite="storeFavorites.isFavorite(selected.name)"
        @close-modal="showModal = !showModal"
        @add-favorite="handleAddFavorite"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from "vue";
import BaseSearch from "../components/BaseSearch.vue";
import BaseList from "../components/BaseList.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLoader from "../components/BaseLoader.vue";
import BaseModal from "../components/BaseModal.vue";
import BaseError from "../components/BaseError.vue";
import { usePokemon } from "../composables/usePokemon";
import { useFavoritesStore } from "../stores/useFavoritesStore.js";

const storeFavorites = useFavoritesStore();

const BaseIcons = inject("BaseIcons");
const {
  pokemonList,
  pokemonSearch,
  loading,
  error,
  fetchPokemon,
  fetchPokemonByName,
} = usePokemon();
const btnTypeAll = ref("primary");
const btnTypeFavorites = ref("tertiary");
const btnAllSelected = ref(true);
const showModal = ref(false);
const selected = ref({});
const searchField = ref('');

const filteredList = computed(() => {
  let arrayPokemon = [];
  // get the list "general" or "favorites"
  if (btnAllSelected.value) {
    arrayPokemon = pokemonList.value;
  } else {
    arrayPokemon = pokemonList.value.filter((item) => storeFavorites.getFavorites.includes(item.name));
  }
  // if the "search" field have a value, then search...
  if (searchField.value) {
    const queryLower = searchField.value.toLowerCase();
    arrayPokemon = arrayPokemon.filter(item => {
      const name = item.name.toLowerCase();
      return name.startsWith(queryLower) ||
        name.split(' ').some(word => word.startsWith(queryLower));
    });
  }

  return arrayPokemon;
});

// message shown when a search yields no results
const errorDataValue = computed(() => {
  return searchField.value && !filteredList.value.length
    ? 'You look lost on your journey!'
    : '';
});


// event to change the selectors
const handleSelectorButton = () => {
  btnAllSelected.value = !btnAllSelected.value;
  if (btnAllSelected.value) {
    btnTypeAll.value = "primary";
    btnTypeFavorites.value = "tertiary";
  } else {
    btnTypeAll.value = "tertiary";
    btnTypeFavorites.value = "primary";
  }
  searchField.value = '';
};

// event to find and show the pokemon selected in the modal
const handleSelectPokemon = async (pokemon) => {
  await fetchPokemonByName(pokemon);
  showModal.value = !error.value;
  setSelectedPokemon();
}

// add or remove a favorite (persisted to localStorage automatically by the store)
const handleAddFavorite = (name) => {
  storeFavorites.addToFavorites(name);
}

// set pokemon selected
const setSelectedPokemon = () => {
  selected.value = {
    id: pokemonSearch.value?.id,
    image: pokemonSearch.value?.sprites?.other?.['official-artwork']?.front_default,
    name: pokemonSearch.value?.name,
    weight: pokemonSearch.value?.weight,
    height: pokemonSearch.value?.height,
    types: pokemonSearch.value?.types?.map((item) => { return item.type.name }).join(', '),
  }
}

onMounted(() => {
  fetchPokemon();
});
</script>


<style scoped>
::-webkit-scrollbar {
    display: none;
}

.containerPokemonView {
  @apply w-[31.5rem] h-[90vh] relative;
}
@media (min-width: 768px) {
  .containerPokemonView {
    @apply w-[57rem];
  }
}

.containerHeader {
  @apply h-[5rem] w-full top-[0] z-[2] absolute;
}

.containerList {
  @apply w-full absolute z-[0] top-[7rem] bottom-[2rem] overflow-auto;
}

.loader {
  @apply flex justify-center items-center h-[80%];
}

.containerFooter {
  box-shadow: 0px -1px 8px 0px var(--lightgray);
  @apply w-full h-[8rem] bottom-[0] left-[0] right-[0]
    flex justify-center items-center content-center
    fixed z-[5] bg-[var(--midwhite)];
}

.containerSelectors {
  @apply w-[31.5rem] flex gap-[1rem] justify-center items-center;
}
@media (min-width: 768px) {
  .containerSelectors {
    @apply w-[57rem];
  }
}
</style>
import { ref, watch } from 'vue';

// reactive ref synced with localStorage under the given key
export function useStorage(key, defaultValue = []) {
  const stored = localStorage.getItem(key);
  const data = ref(stored ? JSON.parse(stored) : defaultValue);

  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, { deep: true });

  return data;
}

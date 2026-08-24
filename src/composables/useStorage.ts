import { ref, watch, type Ref } from 'vue';

// reactive ref synced with localStorage under the given key
export function useStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>;

  watch(data, (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, { deep: true });

  return data;
}

// Utilities
import { createPinia } from 'pinia'

const pinia = createPinia();

export const useStore = pinia.useStore;
export default createPinia()

import {defineStore} from 'pinia'
import {useLocalStorage} from "@vueuse/core";
import {computed} from "vue";

export const useUsedButtonsStore = defineStore('used-buttons', () => {
    const store = useLocalStorage('used-buttons', {});

    function isUsed(index) {
        return store.value[index] === true;
    }

    function markAsUsed(index) {
        return store.value[index] = true;
    }

    function reset() {
        store.value = {};
    }

    const count = computed(() => Object.keys(store.value).length);

    return {isUsed, markAsUsed, reset, count};
})
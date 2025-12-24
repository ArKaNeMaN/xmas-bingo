import {defineStore} from 'pinia'
import {useLocalStorage} from "@vueuse/core";
import {computed} from "vue";
import {useTracksStore} from "@/stores/tracks.js";

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

    const tracks = useTracksStore();
    const isFinished = computed(() => {
        for (let track of tracks.list) {
            if (!isUsed(track.uuid)) {
                return false;
            }
        }

        return true;
    });

    return {isUsed, markAsUsed, reset, count, isFinished};
})
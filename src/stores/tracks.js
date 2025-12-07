import {useLocalStorage} from "@vueuse/core";
import {defineStore} from "pinia";
import {computed, unref} from "vue";

export const useTracksStore = defineStore('tracks', () => {
    const tracksMap = useLocalStorage('tracks', {});

    function add(name, url, uuid = null) {
        uuid ??= crypto.randomUUID();

        const track = {name, url, uuid};

        tracksMap.value[track.uuid] = track;
    }

    function remove(trackOrUuid) {
        if (typeof trackOrUuid === 'string') {
            delete tracksMap.value[trackOrUuid];
        } else {
            delete tracksMap.value[trackOrUuid.uuid];
        }
    }

    const list = computed(() => Object.values(tracksMap.value));

    const count = computed(() => Object.keys(tracksMap.value).length);

    return {list, add, remove, count};
});
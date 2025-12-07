import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {computed} from "vue";
import {useTracksStore} from "@/stores/tracks.js";
import md5 from 'md5';

export const useSeedStore = defineStore('seed', () => {
    const seed = useLocalStorage('seed', 'default_seed');

    function update(newSeed) {
        seed.value = newSeed;
    }

    const value = computed(() => seed.value);

    function hash(str) {
        str = md5(str);
        let hash = 0;
        for (let i = 0, len = str.length; i < len; i++) {
            let chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    function shuffle(array) {
        let s = hash(seed.value);
        let m = array.length, t, i;

        while (m) {
            i = Math.floor(random(s) * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
            ++s;
        }

        return array;
    }

    function random(s) {
        let x = Math.sin(s++) * 10000;

        return x - Math.floor(x);
    }

    function sort(list, keyGetter) {
        let l = [...list];

        return shuffle(l.sort((a, b) => keyGetter(a) - keyGetter(b)));
    }

    const tracks = useTracksStore();
    const sortedTracks = computed(() => {
        return sort(tracks.list, track => track.uuid);
    });

    return {value, update, sortedTracks};
});
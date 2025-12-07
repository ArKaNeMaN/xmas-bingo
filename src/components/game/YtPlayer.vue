<script setup>
import {computed, onMounted, ref} from "vue";

const props = defineProps({
    url: String,
    width: Number,
    height: Number,
});

const embedUrl = computed(() => {
    return props.url.replace('watch?v=', 'embed/') + '?autoplay=1&fs=0&disablekb=0&rel=0&controls=1&iv_load_policy=0&showinfo=0';
});
</script>

<template>
    <iframe
        id="player"
        type="text/html"
        :width="width"
        :height="height"
        :src="embedUrl"
    ></iframe>
</template>

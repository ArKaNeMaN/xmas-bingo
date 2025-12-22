<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";

const props = defineProps({
    url: String,
});

const embedUrl = computed(() => {
    return buildYoutubeEmbedUrl(props.url);
});

function buildYoutubeEmbedUrl(rawUrl) {
    try {
        const url = new URL(rawUrl);

        let videoId = null;
        let playlistId = url.searchParams.get('list');

        // youtu.be/VIDEO_ID
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        }

        // youtube.com/*
        if (!videoId && url.hostname.includes('youtube.com')) {
            // /watch?v=VIDEO_ID
            videoId = url.searchParams.get('v');

            // /embed/VIDEO_ID
            if (!videoId && url.pathname.startsWith('/embed/')) {
                videoId = url.pathname.split('/')[2];
            }

            // /shorts/VIDEO_ID
            if (!videoId && url.pathname.startsWith('/shorts/')) {
                videoId = url.pathname.split('/')[2];
            }
        }

        if (!videoId) return '';

        const params = new URLSearchParams({
            autoplay: '1',
            fs: '0',
            disablekb: '0',
            rel: '0',
            controls: '1',
            iv_load_policy: '0',
            showinfo: '0',
        });

        if (playlistId) {
            params.set('list', playlistId);
        }

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    } catch {
        return '';
    }
}

const frameEl = ref(null);
const divEl = ref(null);
let observer = null;

onMounted(function () {
    setTimeout(function () {
        frameEl.value.width = divEl.value.offsetWidth;
        frameEl.value.height = divEl.value.offsetHeight;

        observer = new ResizeObserver(function () {
            frameEl.value.width = divEl.value.offsetWidth;
            frameEl.value.height = divEl.value.offsetHeight;
        });
        observer.observe(document.body);
        observer.observe(divEl.value);
    }, 0);
});

onUnmounted(function () {
    observer.disconnect();
});

</script>

<template>
    <div ref="divEl" class="bg-black">
        <iframe
            id="player"
            type="text/html"
            :src="embedUrl"
            ref="frameEl"
        ></iframe>
    </div>
</template>

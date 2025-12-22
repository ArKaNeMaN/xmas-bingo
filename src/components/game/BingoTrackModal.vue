<script setup>
import YtPlayer from "@/components/game/YtPlayer.vue";
import {onMounted, onUnmounted} from "vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

const emit = defineEmits([
    'close'
]);

const props = defineProps({
    open: Boolean,
    url: String,
    name: String,
});

function onClose() {
    emit('close');
}

function onKeydown(event) {
    if (!props.open) {
        return;
    }

    if (event.key === 'Escape') {
        onClose();
    }
}

onMounted(() => {
    document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown);
});

</script>

<template>
    <teleport to="body" v-if="open">
        <div class="fixed inset-0">
            <div class="bg-black/70 w-full h-full relative">
                <a
                    class="cursor-pointer w-1/12 aspect-square right-0 top-0 absolute text-zinc-400 flex justify-center"
                    @click="onClose"
                >
                    <CrossIcon class="w-1/3"/>
                </a>

                <div class="w-4/5 mx-auto h-full flex flex-col">
                    <div class="h-1/12 w-full shrink-0"></div>
                    <yt-player class="h-9/12 aspect-video" :url="url"/>
                    <div class="h-2/12 w-full shrink-0">
                        <div
                            class="w-11/12 h-3/5 opacity-80 border-[.3vh] mx-auto my-[2%] rounded-[3vh] bg-zinc-950 animate-grow flex flex-col justify-center">
                            <p class="text-center text-[4.75vh]">{{ name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

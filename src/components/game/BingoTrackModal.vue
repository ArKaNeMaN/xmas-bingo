<script setup>
import YtPlayer from "@/components/game/YtPlayer.vue";
import {onMounted, onUnmounted, watch} from "vue";

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
        <div
            class="fixed inset-0 bg-black/70 flex items-center justify-center"
        >
            <div class="grid grid-rows-6 w-full">
                <div class="row-span-1">
                    <div class="w-full h-full flex flex-row justify-end px-16">
                        <a
                            @click="onClose"
                            class="font-bold text-8xl text-zinc-600/60 cursor-pointer"
                        >x</a>
                    </div>
                </div>
                <div class="row-span-4 w-full flex flex-row justify-center">
                    <YtPlayer
                        :width="1280"
                        :height="720"
                        :url="url"
                    ></YtPlayer>
                </div>
                <div class="row-span-1 p-12">
                    <div
                        class="opacity-80 border-2 text-center container mx-auto rounded-2xl py-4 text-4xl bg-zinc-950 animate-grow"
                    >
                        {{ name }}
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

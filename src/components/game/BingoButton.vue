<script setup>
import {computed, ref} from "vue";
import BingoTrackModal from "@/components/game/BingoTrackModal.vue";

const emit = defineEmits([
    'use',
]);

const props = defineProps({
    used: Boolean,
    url: String,
    name: String,
});

const classes = computed(() => {
    return props.used ? 'bg-zinc-700 text-muted' : 'bg-zinc-800 font-bold';
});

const modalOpen = ref(false);

function onClick(force = false) {
    if (props.used && !force) {
        return;
    }

    modalOpen.value = true;
}

function onClose() {
    modalOpen.value = false;
    emit('use');
}

</script>

<template>
    <button
        class="border-4 text-3xl w-20 h-20 cursor-pointer outline-0" :class="classes"
        @click.prevent="onClick(false)"
        @click.alt.prevent="onClick(true)"
    >
        <slot></slot>
    </button>

    <BingoTrackModal v-if="modalOpen" :open="true" :url="url" :name="name" @close="onClose"/>
</template>

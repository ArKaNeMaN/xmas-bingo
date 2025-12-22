<script setup>
import BingoButton from "@/components/game/BingoButton.vue";
import {useUsedButtonsStore} from "@/stores/used-buttons.js";
import {useSeedStore} from "@/stores/seed.js";

const seed = useSeedStore();

const usedButtons = useUsedButtonsStore();
function onButtonUsed(index) {
    usedButtons.markAsUsed(index)
}
function isButtonUsed(index) {
    return usedButtons.isUsed(index);
}
</script>

<template>
    <div class="h-full flex flex-col justify-center">
        <div class="p-24 flex justify-around items-center flex-row flex-wrap gap-16 opacity-95">
            <BingoButton
                v-for="(track, index) in seed.sortedTracks"
                :key="track.uuid"
                :url="track.url"
                :name="track.name"
                :used="isButtonUsed(track.uuid)"
                @use="onButtonUsed(track.uuid)"
            >
                {{ index + 1 }}
            </BingoButton>
        </div>
    </div>
</template>

<style scoped>

</style>
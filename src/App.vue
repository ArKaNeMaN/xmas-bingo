<script setup>
import MainMenuBar from "@/components/MainMenuBar.vue";
import {useColorMode} from "@vueuse/core";
import SnowEffect from "@/components/SnowEffect.vue";

const mode = useColorMode();
mode.value = 'dark';
</script>

<template>
    <div class="flex flex-col h-screen">
        <SnowEffect/>
        <div class="container mx-auto shrink-0 flex justify-center p-2">
            <MainMenuBar/>
        </div>
        <div class="grow overflow-x-auto">
            <router-view/>
        </div>
    </div>
</template>

<style scoped>

</style>

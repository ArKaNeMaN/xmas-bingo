import {createRouter, createWebHashHistory} from 'vue-router'

import SettingsView from "@/views/SettingsView.vue";
import GameView from "@/views/GameView.vue";
import {nextTick} from "vue";

const routes = [
    {
        path: '/',
        component: GameView,
        name: 'game',
        meta: {
            title: 'Игра',
        },
    },
    {
        path: '/settings',
        component: SettingsView,
        name: 'settings',
        meta: {
            title: 'Настройки',
        },
    },
];

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

const DEFAULT_TITLE = 'XMaX Bingo';
router.afterEach(async (to, from) => {
    await nextTick();
    document.title = `${DEFAULT_TITLE} - ${to.meta.title}`;
});
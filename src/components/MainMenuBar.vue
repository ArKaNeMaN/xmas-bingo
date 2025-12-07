<script setup>
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu/index.js";
import {useRouter} from "vue-router";

const items = [
    {
        title: 'Игра',
        route: '/',
    },
    {
        title: 'Настройки',
        route: '/settings',
    },
];

const router = useRouter();

function navigateTo(route) {
    router.push(route);
}
</script>

<template>
    <NavigationMenu :viewport="false">
        <NavigationMenuList>
            <NavigationMenuItem v-for="item in items">
                <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
                    <a
                        @click.prevent="navigateTo(item.route)"
                        :href="item.route"
                    >{{ item.title }}</a>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

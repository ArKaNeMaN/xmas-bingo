<script setup>

import {useUsedButtonsStore} from "@/stores/used-buttons.js";
import {Button} from "@/components/ui/button/index.js";
import {
    Card, CardAction,
    CardContent, CardDescription, CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card/index.js";
import {Input} from "@/components/ui/input/index.js";
import {computed, ref} from "vue";
import {useTracksStore} from "@/stores/tracks.js";
import {useSeedStore} from "@/stores/seed.js";
import {ScrollArea} from "@/components/ui/scroll-area/index.js";

const usedButtons = useUsedButtonsStore();
const tracks = useTracksStore();
const seed = useSeedStore();

function onResetGame() {
    if (!confirm('Вы точно хотите сбросить прогресс?')) {
        return;
    }

    if (!confirm('Прям точно-точно?))')) {
        return;
    }

    usedButtons.reset();
}

const newSeed = ref(seed.value);

function onUpdateSeed() {
    seed.update(newSeed.value);
}

function onRandomSeed() {
    newSeed.value = crypto.randomUUID();
}

const newTrackName = ref('');
const newTrackUrl = ref('');

function onAddTrack() {
    if (newTrackName.value === '' || newTrackUrl.value === '') {
        alert('Название и ссылка на трек обязательны.');
        return;
    }

    if (!newTrackUrl.value.toString().startsWith('https://www.youtube.com/watch?v=')) {
        alert('Ссылка должна быть на видео на YouTube формата https://www.youtube.com/watch?v=VIDEO_ID');
        return;
    }

    tracks.add(newTrackName.value, newTrackUrl.value);
    newTrackName.value = '';
    newTrackUrl.value = '';
}

function onRemoveTrack(uuid) {
    tracks.remove(uuid);
}

function onExportTracks() {
    alert('Результат экспорта был скопирован в буфер обмена.');

    let objJsonStr = encodeURIComponent(JSON.stringify(tracks.list));
    let objJsonB64 = btoa(objJsonStr);
    console.log(objJsonB64);

    navigator.clipboard.writeText(objJsonB64);
}

const importString = ref('');

function onImportTracks() {
    if (importString.value === '') {
        alert('Строка не может быть пустой.');
        return;
    }

    let json = [];
    try {
        json = JSON.parse(decodeURIComponent(atob(importString.value)));
    } catch (e) {
        console.error(e);
        alert('Указанная строка некорректна.');
        return;
    }

    for (let track of json) {
        tracks.add(track.name, track.url, track.uuid);
    }

    importString.value = '';
}

const isTracksExpanded = ref(false);
const tracksListClasses = computed(() => isTracksExpanded.value ? 'h-120' : 'h-32');
</script>

<template>
    <ScrollArea class="h-full">
        <div class="container grid grid-cols-2 gap-4 mx-auto py-8 opacity-95">
            <Card>
                <CardHeader>
                    <CardTitle>Прогресс игры</CardTitle>
                    <CardDescription>
                        Кол-во использованных кнопок
                    </CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col gap-2 items-start">
                    <p>Текущий прогресс: {{ usedButtons.count }}</p>
                    <Button @click.prevent="onResetGame">Сбросить прогресс</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Порядок кнопок</CardTitle>
                    <CardDescription>
                        Порядок кнопок можно воспроизвести указав тот же сид с тем же набором треков
                    </CardDescription>
                </CardHeader>
                <CardContent class="flex flex-col gap-2 items-start">
                    <p>Текущий сид: {{ seed.value }}</p>

                    <form class="flex flex-row gap-2" @submit.prevent="onUpdateSeed">
                        <Input v-model="newSeed"/>
                        <Button type="submit">Обновить</Button>
                        <Button variant="outline" type="button" @click.prevent="onRandomSeed">
                            Случайный
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card class="col-span-2">
                <CardHeader>
                    <CardTitle>Список треков</CardTitle>
                    <CardDescription>
                        Участвующие в игре треки. Всего {{ tracks.count }}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea class="px-4 transition-all" :class="tracksListClasses">
                        <div
                            v-for="track in tracks.list"
                            :key="track.uuid"
                            class="flex flex-row items-center gap-2 my-2"
                        >
                            <div class="grid grid-cols-2 gap-2 w-full">
                                <Input disabled :model-value="track.name"/>
                                <Input disabled :model-value="track.url"/>
                            </div>
                            <Button variant="destructive"
                                    @click.prevent="onRemoveTrack(track.uuid)">
                                Удалить
                            </Button>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter class="flex flex-col gap-2">
                    <Button variant="outline" class="w-full" type="button" @click.prevent="isTracksExpanded = !isTracksExpanded">
                        <template v-if="isTracksExpanded">
                            Свернуть
                        </template>
                        <template v-else>
                            Развернуть
                        </template>
                    </Button>
                </CardFooter>
            </Card>
            <Card class="col-span-2">
                <CardHeader>
                    <CardTitle>Добавить трек</CardTitle>
                    <CardDescription>
                        Ссылка должна быть на видео на YouTube формата
                        https://www.youtube.com/watch?v=VIDEO_ID
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form class="grid grid-cols-2 gap-2 w-full" @submit.prevent="onAddTrack">
                        <Input v-model="newTrackName" placeholder="Название трека"/>
                        <Input v-model="newTrackUrl" placeholder="Ссылка на трек на YouTube"/>
                        <Button class="col-span-2" type="submit">Добавить</Button>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Экспорт треков</CardTitle>
                    <CardDescription>
                        Полученную строку можно будет импортировать обратно на другом ПК.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="grid grid-cols-1 w-full">
                        <Button @click.prevent="onExportTracks">Экспортировать</Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Импорт треков</CardTitle>
                    <CardDescription>
                        Импорт ранее экспортированного списка треков.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form class="grid grid-cols-1 w-full gap-2" @submit.prevent="onImportTracks">
                        <Input v-model="importString" placeholder="Полученная из экспорта строка"/>
                        <Button type="submit">Импортировать</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </ScrollArea>
</template>

<style scoped>

</style>
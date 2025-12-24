<script setup>
import Fireworks from "@fireworks-js/vue";
</script>

<template>
    <teleport to="body">
        <Fireworks
            :autostart="true"
            :options="{
                autoresize: true,
                brightness: {min: 50, max: 85},
                lineWidth: {
                    explosion: {min: 1, max: 5},
                    trace: {min: 1, max: 2}
                },
                gravity: 0.5,
                particles: 80,
                friction: 0.95,
                flickering: 100,
                explosion: 5,
                opacity: 0.1,
                delay: {min: 60, max: 100},
                decay: {min: 0.02, max: 0.05},
                acceleration: 1,
                intensity: 20,
                traceLength: 1,
                traceSpeed: 30,
                sound: {
                    enabled: false
                }
            }"
            :style="{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: '#00000000',
                'z-index': -999
            }"
        />
    </teleport>
</template>

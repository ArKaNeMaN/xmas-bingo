<script setup>
import {onMounted, ref} from "vue";

const Snowflake = (function () {
    let flakes;
    const flakesTotal = (width) => Math.round(width * 0.1);

    let canvas;
    let ctx;
    let initialOpacity = .9;
    let meltedOpacity = .1;
    let opacityTransitionSpeed = .01;

    class Snowflake {
        constructor(size, x, y, vx, vy, yellow = false) {
            this.size = size;
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.laing = false;
            this.melting = false;
            this.opacity = initialOpacity;
            this.endOpacity = initialOpacity;

            this.color = () => yellow
                ? `rgba(254, 240, 138, ${this.opacity})`
                : `rgba(255, 255, 255, ${this.opacity})`;
        }

        static init(container) {
            canvas = container;
            ctx = canvas.getContext('2d');

            function init() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const {width, height} = canvas.getBoundingClientRect();

                const flakesCount = flakesTotal(width);
                while (flakes.length < flakesCount) {
                    const size = Math.round(Math.random() * 3 + 1);
                    const flake = new Snowflake(
                        size,
                        Math.random() * width,
                        Math.random() * height,
                        Math.random() - 0.5,
                        size * 0.25,
                        Math.random() < 0.15
                    );
                    flakes.push(flake);
                }

                if (flakes.length > flakesCount) {
                    flakes.splice(flakesCount);
                }
            }

            flakes = [];
            init();
            (new ResizeObserver(init)).observe(canvas);

            update();
        }

        static stop() {
            stopped = true;
        }

        static continue() {
            stopped = false;
            update();
        }

        move() {
            const {width: cw, height: ch} = canvas.getBoundingClientRect();

            if (this.endOpacity !== this.opacity) {
                if (Math.abs(this.endOpacity - this.opacity) <= opacityTransitionSpeed) {
                    this.opacity = this.endOpacity;
                } else {
                    this.opacity -= opacityTransitionSpeed * Math.pow(this.endOpacity - this.opacity, 0);
                }
            }

            if (this.laing) {
                if (this.melting) {
                    if (Math.random() > 0.99) {
                        this.x = Math.random() * cw;
                        this.y = -this.size;
                        this.opacity = initialOpacity;
                        this.endOpacity = initialOpacity;
                        this.laing = false;
                        this.melting = false;
                    }
                } else {
                    if (Math.random() > 0.95) {
                        this.endOpacity = meltedOpacity;
                        this.melting = true;
                    }
                }

                return;
            } else {
                this.x += this.vx;
                this.y += this.vy;
            }

            if (this.x > cw + this.size) {
                this.x -= cw + this.size;
            }

            if (this.x < -this.size) {
                this.x += cw + this.size;
            }

            if (this.y > ch - this.size) {
                this.laing = true;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fillStyle = this.color();
            ctx.fill();
        }
    }


    let stopped = false;

    function update() {
        const {width, height} = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);

        if (stopped) {
            return;
        }

        for (let flake of flakes) {
            flake.move();
            flake.draw();
        }

        requestAnimationFrame(update);
    }


    return Snowflake;
}());

const snowCanvasEl = ref(null);
onMounted(() => {
    setTimeout(() => Snowflake.init(snowCanvasEl.value), 0);
});
</script>

<template>
    <teleport to="body">
        <canvas
            ref="snowCanvasEl"
            class="snow-effect-block"
        ></canvas>
    </teleport>
</template>

<style>
.snow-effect-block {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: -999;
}
</style>
<script setup lang="ts">
import Player from "@renderer/components/Player.vue";
import video from "@renderer/assets/videos/institucional.mp4"
</script>

<template>
    <main>
        <section>
            <Player :video="video"/>
        </section>
    </main>
</template>
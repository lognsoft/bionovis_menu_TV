<script setup lang="ts">
import JSMPlayer from "@renderer/components/JSMPlayer.vue";

defineProps({
    port:String
})
</script>

<template>
    <main>
        <JSMPlayer :cam="port"/>
    </main>
</template>
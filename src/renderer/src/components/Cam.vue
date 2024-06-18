<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import useAudioStore from '@renderer/stores/useAudioStore';

const store = useAudioStore();

interface Cam {
    port:number;
    delay:number;
    img:string
}
const props = defineProps<Cam>();
const opacity:Ref<number> = ref(0);

function getImageUrl(img:string){
    return new URL(`../assets/images/cameras/CAM-${img}`, import.meta.url).href;
}

const img:Ref<string> = ref(getImageUrl(props.img))

onMounted(() => {
    setTimeout(() => {
        opacity.value = 1;
    }, props.delay);
})
</script>

<template>
    <router-link class="cam" :to="{name:'stream',params:{port:props.port}}" :style="`opacity:${opacity}`" @click="store.play">
        <img :src="`${img}`"/>
        <span>
            <slot/>
        </span>
    </router-link>
</template>

<style scoped>
.cam{
    @apply text-white font-bold aspect-video overflow-hidden relative duration-300;
    -webkit-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
}
.cam img {
    @apply w-full h-full object-cover object-center;
}
.cam span{
    @apply absolute bg-black/60 w-full bottom-0 overflow-hidden left-0 px-2 py-1 text-sm whitespace-pre text-ellipsis;
}
</style>
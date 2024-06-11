<script setup lang="ts">
import { useRouter } from 'vue-router';
import CloseBold from '@renderer/components/icons/CloseBold.vue';
import useCamStore from '@renderer/stores/useCamStore';
import { storeToRefs } from 'pinia';
import { onBeforeUnmount, Ref, ref } from 'vue';

const router = useRouter();
const store = useCamStore();
const { paramCam } = storeToRefs(store);
const cursor:Ref<boolean> = ref(false);
const timer:Ref<any> = ref(null);

interface IPlayer{
    video:string;
    onCustomEvent?:(param?:any) => void;
}

const props = defineProps<IPlayer>()

function closeVideo(){
    if(props.onCustomEvent){
        props.onCustomEvent();
    } else {
        router.push({name:"videos",params:{nameVideos:paramCam.value}});
    }
    
}
function visibleCloseButton(){
    if(timer.value !== null) clearTimeout(timer.value)
    cursor.value = true;
    fadeTime();
}

function fadeTime(){
    timer.value = setTimeout(() => {
        cursor.value = false;
    },2500)
}

onBeforeUnmount(() => {
    if(timer.value !== null) clearTimeout(timer.value);
})
</script>

<template>
    <div class="relative w-full">
        <video class="player-video" :src="props.video" controls autoplay @mousemove="visibleCloseButton"></video>
        <div class="close-video" :class="{'opacity-100':cursor, 'opacity-0':!cursor}" @click="closeVideo" title="Fechar Vídeo">
            <CloseBold/>
        </div>
    </div>
</template>

<style scoped>
    .player-video{
        @apply w-full h-full relative object-cover;
    }
    .close-video{
        @apply absolute bottom-[90px] right-[26px] text-white text-4xl cursor-pointer hover:bg-[#222327] rounded-full p-[4px] duration-[175ms];
    }
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import CloseBold from '@renderer/components/icons/CloseBold.vue';
import useCamStore from '@renderer/stores/useCamStore';
import { storeToRefs } from 'pinia';
// import { onBeforeUnmount, Ref, ref } from 'vue';

const router = useRouter();
const store = useCamStore();
const { paramCam } = storeToRefs(store);

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
</script>

<template>
    <div class="relative w-full">
        <!-- <video class="player-video" :src="props.video" controls autoplay></video> -->
        <iframe src="https://player.vimeo.com/video/958364640?h=66f387e677" class="player-iframe" frameborder="0" allow="autoplay;"></iframe>
        <div class="close-video" @click="closeVideo" title="Fechar Vídeo">
            <CloseBold/>
        </div>
    </div>
</template>

<style scoped>
    .player-video{
        @apply w-full h-full relative object-cover;
    }
    .player-iframe{
        @apply
        w-full
        aspect-video
    }
    .close-video{
        @apply absolute bottom-[90px] right-[26px] text-white text-4xl cursor-pointer bg-[#222327] rounded-full p-[4px];
    }
</style>
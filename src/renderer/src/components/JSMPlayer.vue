<script setup lang="ts">
import { onMounted, onBeforeUnmount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import JSMPeg from "@cycjimmy/jsmpeg-player";
import Call from './icons/Call.vue';
import useCamStore from "@renderer/stores/useCamStore";
import useAudioStore from '@renderer/stores/useAudioStore';
import useLanguageStore from '@renderer/stores/useLanguageStore';
import { storeToRefs } from 'pinia';



const { play } = useAudioStore();
const store = useCamStore();
const languages = useLanguageStore();
const { paramCam } = storeToRefs(store);
const { language } = storeToRefs(languages);
interface CanvasHTML extends HTMLElement{
    player
}
const canvas:Ref<CanvasHTML | null> = ref(null);
const isLoading:Ref<boolean> = ref(false);

type Props = { cam:string | undefined };

const router = useRouter();
const props = defineProps<Props>();
const margin:Ref<string> = ref('-100%');

onMounted(() => {
    setTimeout(() => {
        margin.value = '0';
    },500);
    if(canvas.value !== null){
        const startTime = performance.now();
        isLoading.value = true;
        canvas.value.player = new JSMPeg.Player(`ws://localhost:${props.cam}`, {
            canvas: canvas.value,
            autoplay: false,
            loop: true,
            videoBufferSize: 1024 * 1024 * 8,
            audioBufferSize: 1024 * 512, 
            onPlay: function() {
                const endTime = performance.now();
                let calcTime = 2200 - (endTime - startTime);

                setTimeout(() => {
                    isLoading.value = false;

                    if (calcTime < 0) {
                        calcTime = 2200 - (endTime - startTime); 
                    }

                }, Math.max(0, calcTime));
            }
        });
    }
});
onBeforeUnmount(() => {
    if(canvas.value !== null ) canvas.value.player.destroy();
});

function closeCall(){
    play();
    router.push({name:"cams",params:{nameMenu:paramCam.value }});
}

interface CloseCam{
    default:string;
    english:string;
}
const closeCam:CloseCam = {
    default:"Voltar",
    english:"Back",
}
</script>

<template>
    <div id="jsmpeg-wrapper">
        <button class="close-cam-proto" @click="closeCall" :style="`margin-bottom: ${margin}`">
            <div class="align-text">
                <div class="icon"><Call/></div>
                <div>{{ closeCam[language] }}</div>
            </div>
        </button>
        
        <div v-show="isLoading" class="cam-loading">
            <video src="../assets/videos/loading.mp4" autoplay></video>
        </div>
        <canvas v-show="!isLoading" class="cam-player" ref="canvas"></canvas>
    </div>
</template>

<style scoped>
#jsmpeg-wrapper {
    @apply relative z-50;
}
.close-cam-proto{
    @apply
    fixed
    bottom-0
    right-[60px]
    duration-500
    text-white
    bg-[#2dabde]
    xl:w-[150px]
    w-[95px]
    aspect-[1/1.3]
    cursor-pointer
    flex items-center
    justify-center
    text-center
    font-extrabold
    text-sm
    xl:text-xl
    px-3;
    transform: skewX(-10deg);
}
.close-cam-proto .align-text{
    transform: skewX(10deg);
}
.close-cam-proto .icon{
    @apply text-3xl xl:text-5xl flex items-center justify-center
}

.cam-loading{
    @apply flex items-center justify-center text-7xl;
}

.cam-loading,
.cam-player{
    @apply w-full h-screen bg-white;
}
</style>
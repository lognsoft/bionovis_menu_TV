<script setup lang="ts">
import IBigCardProps from "@renderer/types/props/IBigCardProps";
import sound from "@renderer/assets/audios/menuEnter.mp3";
import { Ref, onMounted, ref, watch } from 'vue';


const margin:Ref<string> = ref('0%');
const audio:Ref<HTMLAudioElement | null> = ref(null); 

const props = defineProps<IBigCardProps>();
onMounted(() => {
    if(props.toggle){
       openCard(); 
    }
})

function closeCard(){
    setTimeout(() => {
        margin.value = '0%';
    }, props.timer);
}
function openCard(){
    setTimeout(() => {
        audio.value?.play();
        margin.value = '-100%';
    }, props.timer);
}

watch(() => props.toggle, (val:boolean) => {
    if(val){
        openCard();
    } else {
        closeCard();
    }
})
</script>

<template>
    <div class="big-card" :style="`transform:translateY(${margin}); background-color:${props.color}`">
        <audio class="hidden" :src="sound" ref="audio"></audio>
        <div class="align-text">
            <img :src="props.image" :alt="props.textButton"/>
            <div class="text">{{ props.textButton }}</div>
        </div>
    </div>
</template>

<style scoped>
.big-card{
    @apply xl:w-[250px] w-[140px] aspect-[1/1.7] flex items-center justify-center font-extrabold duration-[300ms] text-center px-6 relative text-base xl:text-2xl;
}
.big-card .align-text{
    transform:skewX(10deg);
}
.big-card .align-text .text{
    @apply mt-2 relative left-[-9px]
}
img{
    @apply w-full max-w-[80px] xl:max-w-[130px] inline-block relative left-[-2px];
}
</style>
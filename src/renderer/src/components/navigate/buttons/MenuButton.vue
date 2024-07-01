<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue';
import ICardProps from "@renderer/types/props/ICardProps";
import sound from "@renderer/assets/audios/menuEnter.mp3";
const props = defineProps<ICardProps>();
const margin:Ref<string> = ref('0%');

const audio:Ref<HTMLAudioElement | null> = ref(null);
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
    <button class="menu-toggle" :style="`transform: translateY(${margin}); background-color:${props.color}`">
        <audio ref="audio" :src="sound" class="hidden"></audio>
        <div class="align-text">
            <div class="icon"><slot/></div>
            <div>{{ props.textButton }}</div>
        </div>
    </button>
</template>

<style scoped>
.menu-toggle {
    @apply xl:w-[150px] w-[95px] aspect-[1/1] flex items-center justify-center text-sm xl:text-xl duration-[300ms] font-extrabold text-center px-4;
}
.icon{
    @apply text-3xl xl:text-5xl flex items-center justify-center;
}
.align-text{
    transform: skewX(10deg);
}
</style>
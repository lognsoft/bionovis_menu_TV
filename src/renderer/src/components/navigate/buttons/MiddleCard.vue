<script setup lang="ts">
import sound from "@renderer/assets/audios/menuEnter.mp3";
import { Ref, ref, onMounted, watch } from 'vue';
import ICardProps from "@renderer/types/props/ICardProps";
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
    <button class="middle-card" :style="`transform: translateY(${margin}); background-color:${props.color}`">
        <div class="align-text">
            <audio class="hidden" ref="audio" :src="sound"></audio>
            <slot/>
        </div>
    </button>
</template>

<style scoped>
.middle-card{
    @apply xl:w-[150px] w-[95px] aspect-[1/1.7] text-sm xl:text-xl font-extrabold flex items-center justify-center duration-[300ms] px-4 relative;
}
.middle-card .align-text{
    @apply text-center;
    transform: skewX(10deg);
}
</style>
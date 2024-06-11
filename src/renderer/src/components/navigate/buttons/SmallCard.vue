<script setup lang="ts">
import { ref,Ref,onMounted, watch } from "vue";
import ISmallCardProps from "@renderer/types/props/ISmallCardProps";
import sound from "@renderer/assets/audios/menuEnter.mp3";

const props = defineProps<ISmallCardProps>();
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
    <RouterLink class="link-page-navigate" :to="props.href" :style="`transform:translateY(${margin});background-color:${props.color}`">
        <audio class="hidden" :src="sound" ref="audio"></audio>
        <div class="align-text">
            <slot/>
        </div>
    </RouterLink>
</template>

<style scoped>
    .link-page-navigate{
        @apply xl:w-[150px] w-[95px] aspect-[1/1] font-extrabold text-sm xl:text-xl text-center flex items-center justify-center px-3 duration-[300ms] relative;
    }
    .align-text{
        transform: skewX(10deg)
    }
</style>
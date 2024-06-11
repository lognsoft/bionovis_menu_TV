<script setup lang="ts">
import { ref, Ref, onMounted, watch } from "vue";
import IBackButtonProps from "@renderer/types/props/IBackButtonProps";
import sound from "@renderer/assets/audios/menuEnter.mp3";


const props = defineProps<IBackButtonProps>();
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
    <button class="action-button" :style="`transform: translateY(${margin}); background-color:${props.color}`">
        <audio class="hidden" :src="sound" ref="audio"></audio>
        <div class="align-text">
            <div class="icon"><slot/></div>
            <div>{{ props.textButton }}</div>
        </div>
    </button>
</template>
@renderer/types/IBackButtonProps
<style scoped>
    .action-button{
        @apply xl:w-[150px] w-[95px] aspect-[1/1] text-sm xl:text-xl font-extrabold duration-[300ms] text-center;
    }
    .action-button .align-text{
        transform: skewX(10deg);
    }
    .icon{
        @apply text-3xl xl:text-5xl flex items-center justify-center;
    }
</style>
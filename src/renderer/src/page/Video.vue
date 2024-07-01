<script setup lang="ts">
import Player from "@renderer/components/Player.vue";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, Ref, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";

const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);
const routeData = useRouter();
const props = defineProps<{videoName:string}>();
const video:Ref<string> = ref('');

const optionMenu:ComputedRef<string> = computed(() => language.value === 'default' ? 'PT':'EN');

const getVideos = async () => {
    const pasta:string = localStorage.getItem("dir") as string;
    const data = await fetch(`http://localhost:3000/startRecord?DirName=${pasta}&optionMenu=${optionMenu.value}&VideoName=${props.videoName}`);

    const res = await data;
    video.value = res.url;
}

onMounted(getVideos);

function redirectFromPageVideo(){
    const url:string | null = localStorage.getItem('cam-videos');
    if(url){
        routeData.push(url);
    }
}

</script>

<template>
    <main>
        <section>
            <Player :video="`${video}`" :on-custom-event="redirectFromPageVideo"/>
        </section>
    </main>
</template>

<style scoped>
section{
    @apply h-screen bg-black flex items-center justify-center;
}
</style>
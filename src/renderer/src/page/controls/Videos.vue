<script setup lang="ts">
import useCamStore from "@renderer/stores/useCamStore";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import video from "@renderer/assets/images/cams/bionovis.jpeg";
import { onMounted } from "vue";
import VideosPage from "@renderer/constants/LivePage";
import { storeToRefs } from "pinia";
const props = defineProps({
    nameVideos:String,
})

const store = useCamStore();
const languages = useLanguageStore();

const { language } = storeToRefs(languages);

onMounted(() => {
    store.setParamCam(props.nameVideos);
});
</script>

<template>
    <main>
        <section class="py-[100px]">
            <div class="container mx-auto px-3">
                <h1 class="title w-full">{{ VideosPage[language] }}</h1>
                <div class="grid grid-cols-4 gap-3">
                    <RouterLink class="link-video" to="/video">
                        <img :src="video" alt="Video">
                        <span>Vídeo</span>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.link-video{
    @apply bg-black aspect-video text-white relative;
    -webkit-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
}
.link-video img {
    @apply w-full h-full object-cover;
}
.link-video span {
    @apply absolute px-2 py-1 bg-black/70 w-full bottom-0 left-0;
}
</style>
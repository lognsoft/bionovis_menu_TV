<script setup lang="ts">
// import useCamStore from "@renderer/stores/useCamStore";
import { computed, ComputedRef, onBeforeUnmount, ref, Ref } from 'vue';
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { onMounted } from "vue";
import VideosPage from "@renderer/constants/VideosPage";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';
const route = useRoute();

// const store = useCamStore();
const languages = useLanguageStore();
const videos:Ref<ReadonlyArray<{video:string, image:string | boolean}> | undefined> = ref();
const props = defineProps<{nameVideos:string}>();
const pasta:Ref<string> = ref('');

const { language } = storeToRefs(languages);
let interval:undefined | ReturnType<typeof setInterval>;

const menuOption:ComputedRef<string> = computed(() => language.value === 'default' ? 'PT': 'EN');

async function getVideos(){
    const request = await fetch(`http://localhost:3000/camerasRecords?optionMenu=${menuOption.value}/${ pasta.value }`);
    const data:ReadonlyArray<{video:string, image:string | boolean}> = await request.json();

    const mapData:Array<{video:string, image:string | boolean}> = await Promise.all(data.map(async (val) => {
        if(typeof val.image === 'boolean'){
            return {
                video: val.video,
                image: false
            }
        } else {
            return {
                video: val.video,
                image: await renderImage(val.image)
            }
        }
    }));

    videos.value = mapData;
    
}

async function renderImage(ImageName:string):Promise<string>{
    let image:ReadonlyArray<string> | string = ImageName.split('/');
    image = image[image.length - 1];

    const data = await fetch(`http://localhost:3000/openImage?ImageName=${image}&optionMenu=${menuOption.value}&DirName=${pasta.value}`);
    console.log(data.url);

    return data.url;
}

onMounted(() => {
    localStorage.setItem('cam-videos', route.path);
    const dir:string = props.nameVideos.split('-')[1].replace(/_/g, " ");
    const dirStorage: string | null = localStorage.getItem("dir");

    if(dirStorage === null || dirStorage !== dir){
        localStorage.setItem("dir", dir);
    }
    pasta.value = dir;
    
    interval = setInterval(async () => {
        getVideos();
    },100);
});


onBeforeUnmount(() => {
    clearInterval(interval);
    interval = undefined;
})

</script>

<template>
    <main>
        <section class="py-[100px]">
            <div class="container mx-auto px-3">
                <h1 class="title w-full">{{ VideosPage[language] }}</h1>
                <div class="grid grid-cols-4 gap-3 mt-[6cm]">

                        <RouterLink  v-for="video,index in videos" :key="index" :style="`background-image: url(${video.image}`" :to="{name:'video', params:{videoName: video.video}}" class="link-video">
                            <template v-if="typeof video.image == 'string'">
                                <img :src="video.image" :alt="video.video">
                            </template> 
                            <span>{{ video.video }}</span>
                        </RouterLink>


                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.link-video{
    @apply bg-[#212121] aspect-video text-white relative;
    -webkit-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 10px -1px rgba(0,0,0,0.75);
}
.link-video img {
    @apply w-full h-full object-cover;
}
.link-video span {
    @apply absolute px-2 py-1 bg-black/40 w-full bottom-0 left-0;
}
</style>
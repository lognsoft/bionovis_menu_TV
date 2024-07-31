<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, Ref, watch } from "vue";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { storeToRefs } from "pinia";
import Player from "@renderer/components/Player.vue";
import CloseBold from "@renderer/components/icons/CloseBold.vue";

//format files
import PDF from "@renderer/components/icons/type_doc/PDF.vue";
import Word from "@renderer/components/icons/type_doc/Word.vue";
import PowerPoint from "@renderer/components/icons/type_doc/PowerPoint.vue";
import Excel from "@renderer/components/icons/type_doc/Excel.vue";
import BMP from "@renderer/components/icons/type_doc/BMP.vue";
import Gif from "@renderer/components/icons/type_doc/Gif.vue";
import SVG from "@renderer/components/icons/type_doc/SVG.vue";
import WebP from "@renderer/components/icons/type_doc/WebP.vue";
import PNG from "@renderer/components/icons/type_doc/PNG.vue";
import JPG from "@renderer/components/icons/type_doc/JPG.vue";
import Play from "@renderer/components/icons/type_doc/Play.vue";

const props = defineProps<{files:string}>();

interface FormatedType{
    file:string;
    fileName:string;
    type:string;
}

const useLanguage = useLanguageStore();
const { language } = storeToRefs(useLanguage);

const fileFlag:Ref<FormatedType | null> = ref(null);

const lang = language.value === "default" ? "PT": "EN";
const dir = language.value === "default" ? "Apresentações": "Presentations";
const typesImage:ReadonlyArray<string> = ["png", "jpeg", "jpg", "svg", "gif", "bmp", "webp"];
const typesText:ReadonlyArray<string> = ["xlsx", "docx", "pdf", "pptx"];
const typesVideo:ReadonlyArray<string> = ["mp4", "ogg", "webm"];

const formatedFiles:Ref<ReadonlyArray<FormatedType>> = ref([]);
const filtered:Ref<ReadonlyArray<FormatedType>> = ref([]);


const getFiles: () => Promise<void> = async ():Promise<void> => {
    const request = await fetch(`http://localhost:3000/presentations?optionMenu=${lang}/${dir}`);
    const data:ReadonlyArray<string> = await request.json();
    
    constructObjects(data);
}

const constructObjects: (files:ReadonlyArray<string>) => void = (files:ReadonlyArray<string>):void => {
    const objs:Array<FormatedType> = files.map(file => {
        const dotSeparate = file.split(".");
        const type = dotSeparate[dotSeparate.length - 1];
        let fileName:ReadonlyArray<string> | string = file.split("\\");
        fileName = fileName[fileName.length - 1];
        return {
            file,
            fileName,
            type
        };
    })
    formatedFiles.value = objs;
    filterFiles();
}

const filterFiles: () => void = ():void => {
    const type:string = props.files;
    const filteredFiles:ReadonlyArray<FormatedType> = formatedFiles.value.filter(file => {
        const extension:string = file.type;
        if(type === "images" && typesImage.includes(extension)) return file
        if(type === "docs" && typesText.includes(extension)) return file;
        if(type === "video" && typesVideo.includes(extension)) return file;

        return false;
    });

    filtered.value = filteredFiles;
    
}

function openFile(file:string, objFile:FormatedType):void{
    if(props.files === "docs" && objFile.type !== "pdf"){
        window.electron.ipcRenderer.send("open-file", file);
        return;
    } else {
        fileFlag.value = objFile;
        return;
    }
}

watch(() => props.files, () => {

})

function closeModal():void{
    fileFlag.value = null;
}

let interval:null | ReturnType<typeof setInterval> = null;
onMounted(() => {
    getFiles();
    interval = setInterval(() => {
        getFiles();
    },10);
})
onBeforeUnmount(() => {
    if(interval !== null) clearInterval(interval);
})
</script>

<template>
    <main>
        <section class="py-[100px]">
            <div class="container mx-auto px-3">
                <div v-if="fileFlag !== null && fileFlag.type === 'pdf'" class="pdf_reader">
                    <object :data="`file://${fileFlag.file}`" type="application/pdf"></object>
                    <span class="close_view" @click="closeModal">
                        <CloseBold/>
                    </span>
                </div>
                <div v-if="fileFlag !== null && typesImage.includes(fileFlag.type)" class="img_view">
                    <img :src="`http://localhost:3000/openImage?ImageName=${fileFlag.fileName}&optionMenu=${lang}&DirName=${dir}`" alt=""/>
                    <span class="close_view" @click="closeModal">
                        <CloseBold/>
                    </span>
                </div>
                <div v-if="fileFlag !== null && typesVideo.includes(fileFlag.type)" class="video_view">
                    <Player
                        :video="`http://localhost:3000/startRecord?VideoName=${fileFlag.fileName}&optionMenu=${lang}&DirName=${dir}`"
                        :on-custom-event="closeModal"
                    />
                </div>
                <h1 class="title w-full">
                    {{ language === 'default' ? "Arquivos" : "Files" }}
                </h1>
                <div class="grid grid-cols-4 gap-4 mt-[6cm]" >
                    <div v-for="file,index in filtered" :key="index" class="file_card" @click="openFile(file.file, file)">
                        <Word v-if="file.type === 'docx'" class="icon"/>
                        <PDF v-else-if="file.type === 'pdf'" class="icon"/>
                        <PowerPoint v-else-if="file.type === 'pptx'" class="icon"/>
                        <Excel v-else-if="file.type === 'xlsx'" class="icon"/>
                        <BMP v-if="file.type === 'bmp'" class="icon"/>
                        <Gif v-else-if="file.type === 'gif'" class="icon"/>
                        <SVG v-else-if="file.type === 'svg'" class="icon"></SVG>
                        <WebP v-else-if="file.type === 'webp'" class="icon"/>
                        <PNG v-else-if="file.type === 'png'" class="icon"/>
                        <JPG v-else-if="file.type === 'jpg' || file.type === 'jpeg'" class="icon"/>
                        <Play v-else-if="file.type === 'mp4' || file.type === 'ogg' || file.type === 'webm'" class="icon"/>

                        <h2 class="file_name">{{ file.fileName }}</h2>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .img_view,
    .pdf_reader,
    .video_view{
        @apply
        absolute
        w-full
        h-screen
        bg-slate-500
        top-0
        left-0;
        z-index: 1000;
    }

    .pdf_reader > object{
        @apply
        w-full
        h-[400px]
    }

    .video_view,
    .img_view{
        @apply
        bg-black/50
        flex
        items-center
        justify-center
    }
    .img_view > img{
        @apply
        h-full
        w-auto
        max-h-[600px]
    }

    .file_card{
        @apply
        flex
        items-center
        justify-center
        aspect-video
        relative
        bg-[#3090b9]
        hover:bg-[#005277]
        text-white
        cursor-pointer
    }

    .icon{
        @apply
        w-[120px]
        h-[120px]
    }

    .file_name{
        @apply
        absolute
        bottom-0
        left-0
        w-full
        px-3
        text-ellipsis
        overflow-hidden
    }

    .close_view{
        @apply absolute right-[26px] text-4xl cursor-pointer rounded-full p-[4px]
        bottom-[200px]
        bg-red-500
        text-white
        justify-center
        
    }
</style>
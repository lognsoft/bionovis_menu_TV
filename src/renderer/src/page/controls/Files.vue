<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, Ref } from "vue";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { storeToRefs } from "pinia";

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

const props = defineProps<{files:string}>();

const useLanguage = useLanguageStore();
const { language } = storeToRefs(useLanguage);

type FormatedType = {
    file:string,
    fileName:string,
    type:string
}

const formatedFiles:Ref<ReadonlyArray<FormatedType>> = ref([]);
const filtered:Ref<ReadonlyArray<FormatedType>> = ref([]);


const getFiles: () => Promise<void> = async ():Promise<void> => {
    const lang = language.value === "default" ? "PT": "EN";
    const adress = language.value === "default" ? "Apresentações": "Presentations";

    const request = await fetch(`http://localhost:3000/presentations?optionMenu=${lang}/${adress}`);
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
    const typesImage:ReadonlyArray<string> = ["png", "jpeg", "jpg", "svg", "gif", "bmp", "webp"];
    const typesText:ReadonlyArray<string> = ["xlsx", "docx", "pdf", "pptx"];
    const filteredFiles:ReadonlyArray<FormatedType> = formatedFiles.value.filter(file => {
        const extension:string = file.type;
        if(type === "images" && typesImage.includes(extension)) return file;
        if(type === "docs" && typesText.includes(extension)) return file;

        return false;
    });

    filtered.value = filteredFiles;
    
}

function openFile(file:string):void{
    window.electron.ipcRenderer.send("open-file", file);
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
                <h1 class="title w-full">Arquivos</h1>
                <div class="grid grid-cols-4 gap-4 mt-[6cm]" >
                    <div
                        v-for="file,index in filtered"
                        :key="index"
                        class="file_card"
                        @click="openFile(file.file)"
                    >
                        <Word v-if="file.type === 'docx'" class="icon"/>
                        <PDF v-else-if="file.type === 'pdf'" class="icon"/>
                        <PowerPoint v-else-if="file.type === 'pptx'" class="icon"/>
                        <Excel v-else-if="file.type === 'xlsx'" class="icon"/>
                        <BMP v-else-if="file.type === 'bmp'" class="icon"/>
                        <Gif v-else-if="file.type === 'gif'" class="icon"/>
                        <SVG v-else-if="file.type === 'svg'" class="icon"></SVG>
                        <WebP v-else-if="file.type === 'webp'" class="icon"/>
                        <PNG v-else-if="file.type === 'png'" class="icon"/>
                        <JPG v-else-if="file.type === 'jpg' || file.type === 'jpeg'" class="icon"/>

                        <h2 class="file_name">{{ file.fileName }}</h2>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .file_card{
        @apply
        flex
        items-center
        justify-center
        aspect-square
        relative
        bg-[#3090b9]
        hover:bg-[#005277]
        text-white
        cursor-pointer
    }

    .icon{
        @apply
        w-[100px]
        h-[100px]
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
</style>
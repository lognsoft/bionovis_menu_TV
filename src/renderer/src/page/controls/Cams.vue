<script setup lang="ts">
import { onMounted, ref, Ref } from "vue"
import Cam from "@renderer/components/Cam.vue";
import useCamStore from "@renderer/stores/useCamStore";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import LivePage from "@renderer/constants/LivePage";
import { storeToRefs } from "pinia";
import type IStream from "@renderer/types/IStream"

const store = useCamStore();
const languages = useLanguageStore();
const { language } = storeToRefs(languages);

const ports:Ref<Array<IStream>> = ref([]);
const props = defineProps({
    nameMenu:String,
})
async function getCams():Promise<void>{
    const req = await fetch(`http://localhost:3000/live-cams/${props.nameMenu}`,{
        headers:{
            "Content-Type": "application/json"
        }
    })
    const res:Array<IStream> = await req.json();
    ports.value = res;
}

onMounted(() => {
    getCams();
    store.setParamCam(props.nameMenu);
})
</script>

<template>
    <main>
        <section class="py-[100px]">
            <div class="container mx-auto px-3">
                <h1 class="title w-full">{{ LivePage[language] }}</h1>
                <div class="px-3 grid grid-cols-4 gap-4">
                    <template v-for="port,index in ports" :key="index">
                        <Cam :port="port.port" :delay="((index+1) * 200)">{{ port.reference[language] }}</Cam>
                    </template>
                </div>
            </div>
        </section>
    </main>
</template>
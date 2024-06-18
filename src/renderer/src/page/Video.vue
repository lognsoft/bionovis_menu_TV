<script setup lang="ts">
import type ILanguage from "@renderer/types/ILanguage";
import Player from "@renderer/components/Player.vue";
import institucional from "@renderer/assets/videos/institucional_PT_Sem_Legenda.mp4";
import institucionalEn from "@renderer/assets/videos/institucional_EN.mp4";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { storeToRefs } from "pinia";

const languageStore = useLanguageStore();
const { language } = storeToRefs(languageStore);

const videos:ILanguage<string> = {
    default:institucional,
    english:institucionalEn
}

</script>

<template>
    <main>
        <section>
            <Player :video="videos[language]"/>
        </section>
    </main>
</template>
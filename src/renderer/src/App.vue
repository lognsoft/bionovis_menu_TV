<script setup lang="ts">
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import useAudioStore from "@renderer/stores/useAudioStore";
import sound from "@renderer/assets/audios/sound.mp3";
import soundStart from "@renderer/assets/audios/sound2.mp3";
import directoryPath from "@renderer/stores/useDirectoryPath";
import useLanguageStore from "./stores/useLanguageStore";
import bg_default from "@renderer/assets/images/bg.png";
import bg_english from "@renderer/assets/images/bg_en.png";

const lang = useLanguageStore();
const store = useAudioStore();
const directory = directoryPath();
const { audio, audioStart } = storeToRefs(store);
const { language } = storeToRefs(lang);

const body:HTMLElement = document.querySelector("body") as HTMLElement;

onMounted(() => {
  directory.verifyDirectoryExist();
  alternateBg();
})

watch(() => language.value, () => {
  alternateBg();
})

function alternateBg(){
  const bg = language.value === "default" ? bg_default : bg_english;
  body.style.backgroundImage = `url(${bg})`;
}

</script>

<template>
  <div>
    <audio ref="audio" :src="sound"></audio>
    <audio ref="audioStart" :src="soundStart"></audio>
    <RouterView v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
  </div>
</template>

<style>
.route-enter-from{
  opacity:0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.7s ease-out;
}


.route-leave-to{
  opacity:0;
  transform: translateX(-100px);
}

.route-leave-active{
  transition: all 0.7s ease-in;
}
</style>

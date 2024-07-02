<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import useAudioStore from "@renderer/stores/useAudioStore";
import sound from "@renderer/assets/audios/sound.mp3";
import soundStart from "@renderer/assets/audios/sound2.mp3";
import directoryPath from "@renderer/stores/useDirectoryPath";

const store = useAudioStore();
const directory = directoryPath();
const { audio, audioStart } = storeToRefs(store);

onMounted(() => {
  directory.verifyDirectoryExist();
})

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

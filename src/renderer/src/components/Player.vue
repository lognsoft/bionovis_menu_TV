<script setup lang="ts">
import { useRouter } from 'vue-router';
import CloseBold from '@renderer/components/icons/CloseBold.vue';
import useCamStore from '@renderer/stores/useCamStore';
import { storeToRefs } from 'pinia';
// import { onBeforeUnmount, Ref, ref } from 'vue';

const router = useRouter();
const store = useCamStore();
const { paramCam } = storeToRefs(store);

interface IPlayer{
  video: string
  onCustomEvent?: (param?: unknown) => void
}

const props = defineProps<IPlayer>()

function closeVideo(){
  if (props.onCustomEvent) {
    props.onCustomEvent()
  } else {
    router.push({ name: 'videos', params: { nameVideos: paramCam.value } })
  }
}
</script>

<template>
  <div class="relative w-full">
    <video class="player-video" :src="props.video" controls autoplay></video>
    <!-- <iframe :src="`${props.video}&autoplay=1`" class="player-iframe" frameborder="0" allow="autoplay;"></iframe> -->
    <div class="close-video" title="Fechar Vídeo" @click="closeVideo">
      <CloseBold />
    </div>
  </div>
</template>

<style scoped>
.player-video {
  @apply w-screen
  h-screen
  relative
  object-contain;
}
.player-iframe{
  @apply w-full
  aspect-video
}
.close-video{
  @apply absolute bottom-[90px] right-[26px] text-white text-4xl cursor-pointer bg-[#222327] rounded-full p-[4px];
}
</style>
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, Ref } from "vue";


interface State{
    audio:Ref<HTMLAudioElement | null>;
    audioStart:Ref<HTMLAudioElement | null>;
    play:() => void;
    startApp:() => void;
}

const useAudioStore = defineStore("useAudioStore", ():State => {
    const audio:Ref<HTMLAudioElement | null> = ref(null);
    const audioStart:Ref<HTMLAudioElement | null> = ref(null);

    function play(){
        if(audio.value !== null){
            audio.value.pause();
            audio.value.currentTime = 0;
            audio.value.play();
        }
    }

    function startApp(){
        if(audioStart.value !== null) audioStart.value.play();
    }

    return {
        audio,
        audioStart,
        play,
        startApp,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAudioStore, import.meta.hot))
}

export default useAudioStore
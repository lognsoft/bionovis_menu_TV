import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, Ref } from "vue";

interface UseCamStore{
    paramCam:Ref<string>;
    setParamCam:(param:string | undefined) => void;
}

const useCamStore = defineStore("useCamSore", ():UseCamStore => {
    const paramCam:Ref<string> = ref('');

    function setParamCam(param:string | undefined){
        if(param !== undefined) paramCam.value = param;
    }

    return {
        paramCam,
        setParamCam,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCamStore, import.meta.hot))
}

export default useCamStore;
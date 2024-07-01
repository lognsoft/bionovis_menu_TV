import { defineStore, acceptHMRUpdate } from "pinia";
import { watch, ref, Ref } from "vue";


interface State{
    language:Ref<string>;
    getKeyLanguage:()=>void;
}

const useLanguageStore = defineStore("languageStore", ():State => {
    const language:Ref<string> = ref('default');

    function getKeyLanguage():void{
        const key:string | null = localStorage.getItem("language-key");
        if(key !== null){
            if(language.value !== key) language.value = key;
        }
    }

    watch(() => language.value, () => {
        localStorage.setItem("language-key", language.value);
    });

    return {
        language,
        getKeyLanguage
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
}


export default useLanguageStore;


import { defineStore, acceptHMRUpdate } from "pinia";
import { Ref, ref } from "vue";

interface UseModalStore{
    modal:Ref<boolean>;
}

const useModalStore = defineStore("useModalStore", ():UseModalStore => {
    const modal:Ref<boolean> = ref(false);
    return {
        modal
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}

export default useModalStore;
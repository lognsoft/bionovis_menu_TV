import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import IRoute, { IRoutes } from "@renderer/types/IRoutes";
import Routes from "@renderer/constants/Route";
import { computed, ref, Ref, ComputedRef } from "vue";
import { useRouter } from "vue-router";

import useAudioStore from "./useAudioStore";
import useLanguageStore from "./useLanguageStore";

const { play } = useAudioStore();
const storeLanguage = useLanguageStore();
const { language } = storeToRefs(storeLanguage);

interface State {
    areas:ComputedRef<ReadonlyArray<IRoutes>>
    initialRouter:Ref<IRoutes | null>;
    toggleMenu:Ref<boolean>;
    closeMenu:Ref<boolean>;
    selectedRouter:Ref<IRoute | null>;
    setRouter: (route:IRoute) => void;
    closeSubMenu: () => void;
    toggleMenuAction: () => void;
    setInitialRouter:(router:IRoutes) => void;
    returnForInitialRouter: () => void;
    root: () => void;
}

const useRouteNavigate = defineStore("routeNavigate", ():State => {
    const router = useRouter();
    const initialRouter:Ref<IRoutes |null> = ref(null);
    const selectedRouter:Ref<IRoute | null> = ref(null);
    const toggleMenu:Ref<boolean> = ref(true);
    const closeMenu:Ref<boolean> = ref(false);

    //escolhendo rota inicial para puxar os menus certos
    function setInitialRouter(router:IRoutes):void{
        play();
        toggleMenu.value = !toggleMenu.value;
        setTimeout(() => {
            initialRouter.value = router;
            setTimeout(() => toggleMenu.value = !toggleMenu.value,10);
        },1100);
    }

    //retornar para o menu inicial
    function returnForInitialRouter(){
        play()
        toggleMenu.value = !toggleMenu.value;
        setTimeout(() => {
            initialRouter.value = null;
            selectedRouter.value = null;
            router.push({name:"home"});
            setTimeout(() => toggleMenu.value = !toggleMenu.value,10);
        },1100);
    }

    //Selecionando submenu para execução
    function setRouter(route:IRoute):void{
        play();
        toggleMenu.value = !toggleMenu.value;
        setTimeout(() => {
            selectedRouter.value = route;
            setTimeout(() => toggleMenu.value = !toggleMenu.value,10);
        },1100);
    }

    //Sair do subMenu
    function closeSubMenu():void{
        play();
        toggleMenu.value = !toggleMenu.value;
        setTimeout(() => {
            selectedRouter.value = null;
            router.push({name:"home"});
            setTimeout(() => toggleMenu.value = !toggleMenu.value,10);
        },1100);
    }


    //abrir e fechar menu
    function toggleMenuAction():void{
        play();
        toggleMenu.value = !toggleMenu.value;
        closeMenu.value = !closeMenu.value;
    }

    function root():void{
        play();
        toggleMenu.value = false;
        setTimeout(() => {
            router.push("/")
            toggleMenu.value = true;
        },1000);
    }

    const lang:ComputedRef<ReadonlyArray<IRoutes>> = computed(() => {
        return Routes[language.value];
    })

    return {
        areas:lang,
        initialRouter,
        closeMenu,
        toggleMenu,
        selectedRouter,
        setRouter,
        closeSubMenu,
        toggleMenuAction,
        setInitialRouter,
        returnForInitialRouter,
        root,
    }
});

// make sure to pass the right store definition, useAuth in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRouteNavigate, import.meta.hot))
}

export default useRouteNavigate;
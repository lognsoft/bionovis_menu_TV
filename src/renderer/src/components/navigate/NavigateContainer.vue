<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from "vue";
import NavigateBigCard from "@renderer/components/navigate/NavigateBigCard.vue";
import MiddleCard from "@renderer/components/navigate/buttons/MiddleCard.vue";
import SmallCard from "@renderer/components/navigate/buttons/SmallCard.vue";
import BackButton from "@renderer/components/navigate/buttons/BackButton.vue";
import Back from "@renderer/components/icons/Back.vue";
import Home from "@renderer/components/icons/Home.vue";
import MenuButton from "@renderer/components/navigate/buttons/MenuButton.vue";
import Menu from "@renderer/components/icons/Menu.vue";
import useRouteNavigate from "@renderer/stores/useRouteNavigate";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import { storeToRefs, } from "pinia";

//conteúdo de botões padrão
import NavigateContainer from "@renderer/constants/NavigateContainer";
import Player from "../Player.vue";

const store = useRouteNavigate();
const storeLanguages = useLanguageStore();
const { selectedRouter, closeMenu, toggleMenu, initialRouter } = storeToRefs(store);
const { language } = storeToRefs(storeLanguages);
// const { modal } = storeToRefs(storeModal);

const lang:ComputedRef<string> = computed(() => {
    let val:string = '';
    if(language.value === 'default'){
        val = "PT"
    } else {
        val = 'EN';
    }
    return val;
})

const flagVideo:Ref<boolean> = ref(false);
const video:Ref<string> = ref('')

async function playVideo(data:string, name:string):Promise<void>{
    try {
        const req = await fetch(`http://localhost:3000/startRecord?DirName=${name}&optionMenu=${lang.value}&VideoName=${data}`);
        video.value = String(req.url);
        flagVideo.value = true;
    } catch (error) {
        console.error(error);
    }
}
function closeVideo(){
    video.value = '';
    flagVideo.value = false;
}
</script>
<template>
    <div class="z-[60] fixed top-0 left-0 bg-black flex items-center justify-center w-full h-screen" v-if="flagVideo && video !== ''">
        <Player :video="video" :on-custom-event="closeVideo"/>
    </div>
    <div class="container-menu">
        <!-- Menu principal -->
        <div class="navigate" v-if="selectedRouter === null && initialRouter === null">
            <template v-for="area,index in store.areas" :key="index">
                <template v-if="area.video !== ''">
                    <NavigateBigCard
                        class="cursor-pointer"
                        :timer="((index+1)* 100)"
                        :toggle="toggleMenu"
                        :color="area.color"
                        :text-button="area.name"
                        :image="area.image"
                        @click="playVideo(area.video, area.name)"
                    />
                </template>
                <template v-else>
                    <NavigateBigCard
                        class="cursor-pointer"
                        :timer="((index+1)* 100)"
                        :toggle="toggleMenu"
                        :color="area.color"
                        :text-button="area.name"
                        :image="area.image"
                        @click="store.setInitialRouter(area)"
                    />
                </template>
            </template>
            <BackButton :timer="(store.areas.length + 1) * 100" :text-button="NavigateContainer[language].back" :toggle="toggleMenu" color="#1d4e53" @click="store.root"><Back/></BackButton>
            <MenuButton :text-button="NavigateContainer[language].closeMenu" @click="store.toggleMenuAction" :toggle="toggleMenu" :timer="(store.areas.length + 2) * 100" color="#27747c"><Menu/></MenuButton>
        </div>
        <!-- fim do Menu principal -->

        <!-- segundo menu -->
        <div class="navigate" v-if="initialRouter !== null && selectedRouter == null && initialRouter.routes">
            <NavigateBigCard :timer="100" :toggle="toggleMenu" :color="initialRouter.color" :text-button="initialRouter.name" :image="initialRouter.image"/>
            <template v-for="route,index in initialRouter.routes" :key="index">
                <template v-if="route.video !== ''">
                    <MiddleCard
                        class="cursor-pointer"
                        :timer="((index+2)*100)"
                        :toggle="toggleMenu"
                        :color="route.color"
                        @click="playVideo(route.video, initialRouter.name)"
                    >
                        <div>{{ route.pathname }}</div>
                        <small v-if="route.subText !== undefined" v-html="route.subText"></small>
                    </MiddleCard>
                </template>
                <template v-else>
                    <MiddleCard
                        class="cursor-pointer"
                        :timer="((index+2)*100)"
                        :toggle="toggleMenu"
                        :color="route.color"
                        @click="store.setRouter(route)"
                    >
                        <div>{{ route.pathname }}</div>
                        <small v-if="route.subText !== undefined" v-html="route.subText"></small>
                    </MiddleCard>
                </template>
            </template>
            <BackButton :text-button="NavigateContainer[language].back" :timer="(initialRouter.routes.length + 2) * 100" :toggle="toggleMenu" color="#1d4e53" @click="store.returnForInitialRouter"><Back/></BackButton>
            <MenuButton :text-button="NavigateContainer[language].closeMenu" @click="store.toggleMenuAction" :toggle="toggleMenu" :timer="(initialRouter.routes.length + 3) * 100" color="#27747c"><Menu/></MenuButton>
        </div>
        <!-- fim do segundo menu -->

        <!-- submenu -->
        <div class="navigate" v-else-if="initialRouter !== null && selectedRouter !== null && selectedRouter.subRoutes">
            <NavigateBigCard :timer="100" :toggle="toggleMenu" :color="initialRouter.color" :text-button="initialRouter.name" :image="initialRouter.image"/>
            <MiddleCard style="cursor: default;" :timer="200" :toggle="toggleMenu" :color="selectedRouter.color">
                <div>{{ selectedRouter.pathname }}</div>
            </MiddleCard>
            <template v-for="subRoute,index in selectedRouter.subRoutes" :key="index">
                <SmallCard :href="subRoute.path" :toggle="toggleMenu" :color="subRoute.color" :timer="(200 + ((index + 1) * 100))" @click="store.toggleMenuAction">{{ subRoute.pathname }}</SmallCard>
            </template>
            <BackButton :text-button="NavigateContainer[language].back" :timer="(selectedRouter.subRoutes.length + 3) * 100" :toggle="toggleMenu" @click="store.closeSubMenu" color="#1d4e53"><Back/></BackButton>
            <MenuButton :text-button="NavigateContainer[language].closeMenu" @click="store.toggleMenuAction" :toggle="toggleMenu" :timer="(selectedRouter?.subRoutes.length + 4) * 100" color="#27747c"><Menu/></MenuButton>
            <BackButton :text-button="NavigateContainer[language].homeButton" :timer="(selectedRouter.subRoutes.length + 5) * 100" :toggle="toggleMenu" @click="store.returnForInitialRouter" color="#79adab"><Home/></BackButton>
        </div>
        <!-- fim do submenu -->

        <!-- botão de chamada de menu -->
        <div class="button-close">
            <MenuButton :text-button="NavigateContainer[language].openMenu" @click="store.toggleMenuAction" :toggle="closeMenu" :timer="1000" color="#3090b9"><Menu/></MenuButton>
        </div>
        <!-- fim do botão de chamada de menu -->
    </div>
</template>

<style scoped>
    .container-menu{
        @apply fixed w-full bottom-0 left-0 text-white text-center z-50 translate-y-[100%] flex justify-center items-start;
    }
    .navigate{
        @apply w-full ml-[-90px] flex items-start justify-center gap-1 h-[459px];
        transform: skewX(-10deg);
    }
    .button-close{
        @apply fixed top-0 right-[70px];
        transform: skewX(-10deg);
    }
    small{
        @apply text-sm;
    }
</style>
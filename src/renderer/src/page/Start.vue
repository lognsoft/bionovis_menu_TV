<script setup lang="ts">
import mosaico from "@renderer/assets/images/logo_mosaico.svg";
import MenuButton from "@renderer/components/navigate/buttons/MenuButton.vue";
import useModalStore from "@renderer/stores/useModalStore";
import useAudioStore from "@renderer/stores/useAudioStore";
import useLanguageStore from "@renderer/stores/useLanguageStore";
import Back from "@renderer/components/icons/Back.vue";
import Modal from "@renderer/components/Modal.vue";
import { storeToRefs } from "pinia";

//conteúdo da página
import PageStart from "@renderer/constants/StartPage"

//images languages
import portuguese from "@renderer/assets/images/flags/flag-brasil.png";
import english from "@renderer/assets/images/flags/flag-america.png";
import { onMounted } from "vue";

//stores
const store = useModalStore();
const languages = useLanguageStore();

const { play, startApp } = useAudioStore();
const { modal } = storeToRefs(store);
const { language } = storeToRefs(languages);

onMounted(() => {
    languages.getKeyLanguage();
})

function closeApp(){
    play();
    modal.value = true;
}
</script>

<template>
    <main>
        <div class="languages">
            <label class="label-language" @click="play">
                <input type="radio" name="language" v-model="language" value="english">
                <figure>
                    <img class="flag" :src="english" alt="flag"/>
                </figure>
            </label>
            <label class="label-language" @click="play">
                <input type="radio" name="language" v-model="language" value="default">
                <figure>
                    <img class="flag" :src="portuguese" alt="flag"/>
                </figure>
            </label>
        </div>


        <Transition name="modal" mode="out-in">
            <Modal v-show="modal"/>
        </Transition>
        <div class="container-start">
            <div class="text-start">
                <h1 class="title-mosaico">{{ PageStart[language].title }}</h1>
                <div v-html="PageStart[language].message"></div>
            </div>
            <div class="flex items-center justify-center">
                <div class="w-full">
                    <RouterLink to="/menu" class="cursor-pointer" @click="startApp">
                        <img class="mosaico" :src="mosaico" alt="okay"/>
                    </RouterLink>
                    <h1 class="title-mandala">{{ PageStart[language].interaction }}</h1>
                </div>
            </div>
        </div>
        <div class="button-close">
            <MenuButton :text-button="PageStart[language].close" @click="closeApp" :toggle="true" :timer="300" color="#3090b9"><Back/></MenuButton>
        </div>
    </main>
</template>

<style scoped>
main{
    @apply flex items-center justify-center text-white;
}
.languages{
    @apply absolute bottom-0 left-0 text-black flex items-center justify-center py-6 px-6 text-center font-bold text-sm gap-x-4;
}
.languages .label-language{
    @apply cursor-pointer;
}
.languages .label-language > input{
    @apply hidden;
}
.languages .label-language > input:checked ~ figure > img{
    box-shadow: 0 0 10px 10px #01e4fa;
}
.languages .flag{
    @apply xl:max-w-[60px] max-w-[50px] rounded-full inline-block;
}
.container-start{
    @apply container mx-auto grid grid-cols-2 gap-2 px-3;
}

.text-start{
    @apply uppercase text-4xl xl:text-6xl font-extrabold;
}

.title-mosaico{
    @apply text-5xl xl:text-7xl mb-[70px] inline-block px-6 py-4;
    background: rgb(0,167,222);
    background: linear-gradient(143deg, rgba(0,167,222,1) 30%, rgba(176,207,0,1) 100%);
}

.mosaico{
    @apply w-full max-w-[25vw] block mx-auto rounded-full;
    animation: pulse 3000ms linear infinite;
}
.title-mandala{
    @apply text-3xl text-center max-w-[380px] mx-auto mt-9 font-extrabold uppercase
}

.button-close{
    @apply fixed top-full right-[70px];
    transform: skewX(-10deg);
}

@keyframes pulse {
    0%,
    100%{
        box-shadow: 0px 0px 10px 10px #01e4fa, inset 0px 0px 60px 25px #01e4fa;
    }
    50%{
        box-shadow: 0px 0px 40px 30px #01e4fa, inset 0px 0px 20px 25px #01e4fa;
    }
}

.modal-enter-from{
  opacity:0;
  transform: translateY(100px);
}
.modal-enter-active{
  transition: all 0.5s ease-out;
}
.modal-leave-to{
  opacity:0;
  transform: translateY(-100px);
}

.modal-leave-active{
  transition: all 0.5s ease-in;
}
</style>
<script setup lang="ts">
import useModalStore from '@renderer/stores/useModalStore';
import useLanguageStore from '@renderer/stores/useLanguageStore';
import { storeToRefs } from 'pinia';
import Modal from "@renderer/constants/Modal";


const store = useModalStore();
const languages = useLanguageStore();
const { modal } = storeToRefs(store);
const { language } = storeToRefs(languages);

// const opacity:Ref<string> = ref('0')
function closeModal(){
    modal.value = false;
}

function closeApp(){
    window.electron.ipcRenderer.send("close-app");
}
</script>

<template>
    <div class="modal-container">
        <div class="modal-alert">
            <h2 class="message">{{ Modal[language].text }}</h2>
            <div class="buttons">
                <button class="button-cancel" @click="closeModal">{{ Modal[language].button }}</button>
                <button class="button-confirm" @click="closeApp">{{ Modal[language].confirmButton }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-container{
    @apply fixed z-[100] top-0 left-0 w-full h-full flex items-center justify-center text-black;
}

.modal-alert{
    @apply bg-white rounded-md w-full max-w-[600px] px-6 py-9 shadow-md shadow-gray-500;
}
.message{
    @apply text-center font-bold text-2xl mb-11
}
.buttons{
    @apply flex items-center justify-center gap-4
}
.buttons button{
    @apply px-[60px] py-2 rounded-md border-2 border-[#238eb7] font-bold duration-200;
}
.buttons button.button-cancel{
    @apply text-[#238eb7] bg-white hover:text-white hover:bg-[#238eb7]
}
.buttons button.button-confirm{
    @apply text-white bg-[#238eb7] hover:text-[#238eb7] hover:bg-white
}
</style>
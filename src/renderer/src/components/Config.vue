<script setup lang="ts">
import directoryPath from "@renderer/stores/useDirectoryPath";
import { ref, Ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
const props = defineProps<{existPath:boolean}>();
const emit = defineEmits(['handler-modal']);
const dir:Ref<string> = ref('');
const error:Ref<boolean> = ref(false);
const directory = directoryPath();
const msgError:Ref<string> = ref('');
const { directoryExist, path } = storeToRefs(directory)

onMounted(() => {
    directory.verifyDirectoryExist();
})

const submitDir:() => Promise<void> = async () =>{
    console.log("okay")
    if(dir.value === ''){
        msgError.value = 'Informe o caminho do diretório';
        error.value = true;
        return
    }
    try {
        const data = await fetch(`http://localhost:3000/configureDirectoriesPath`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newDirectory:dir.value })
        });
        if(data.status == 404 || data.status == 500){
            msgError.value = 'Verifique se o caminho está correto'
            error.value = true;
        } else {
            directoryExist.value = false;
            emit('handler-modal');
        }

    } catch (error) {
        msgError.value = 'Verifique se o caminho está correto'
        error.value = true;
    } 
}
const clearErr:() => void = () => {
    if(error.value === true) error.value = false;
}
const submitEnterDir:(event:Event) => void = (event:Event) => {
    if(event.key === "Enter") submitDir();
}
</script>

<template>
    <div class="modal-container">
        <div class="modal-alert">
            <h2 class="message">Selecione um caminho para os arquivos</h2>
            <p v-if="path !== undefined" class="text-center"><strong>diretório atual: </strong>{{ path }}</p>
            <p v-else class="text-center"><strong>Exemplo: </strong>C:\Users\userExample\exemple</p>
            <input @input="clearErr" @keydown="submitEnterDir" class="input-dir" :class="{'border-[#238eb7] mb-5':error == false, 'border-orange-400':error == true}" type="text" placeholder="C:\Users\userExample\exemple" v-model="dir"/>
            <small class="text-orange-400 mb-5 block" v-show="error">{{ msgError }}</small>
            <div class="buttons">
                <button v-if="!props.existPath" :disabled="props.existPath" class="button-cancel" @click="emit('handler-modal')">fechar</button>
                <button class="button-confirm" @click="submitDir">confirmar</button>
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
    @apply text-center font-bold text-2xl mb-5
}
.input-dir{
    @apply mt-1 border-[1px] w-full px-2 py-1 rounded-md outline-none
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
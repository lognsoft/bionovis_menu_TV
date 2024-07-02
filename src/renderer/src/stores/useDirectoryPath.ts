import { defineStore } from "pinia";
import { ref, Ref } from "vue";


type State = {
    directoryExist:Ref<boolean>;
    configModal:Ref<boolean>;
    verifyDirectoryExist:() => Promise<void>;
}

const directoryPath = defineStore('directory', ():State => {
    const directoryExist:Ref<boolean> = ref(false);
    const configModal:Ref<boolean> = ref(false);

    async function verifyDirectoryExist():Promise<void>{
        try {
            const data = await fetch("http://localhost:3000/checkDirectoriesIfNotExist");
            if(data.status == 404){
                directoryExist.value = true;
                configModal.value = true;
            };
        } catch (error) {
            console.error(error);
        }
    }

    return {
        directoryExist,
        configModal,
        verifyDirectoryExist
    }
});

export default directoryPath;
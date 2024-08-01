import { defineStore } from "pinia";
import { ref, Ref } from "vue";


type State = {
    directoryExist:Ref<boolean>;
    configModal:Ref<boolean>;
    path:Ref<string | undefined>;
    verifyDirectoryExist:() => Promise<void>;
}

const directoryPath = defineStore('directory', ():State => {
    const directoryExist:Ref<boolean> = ref(false);
    const configModal:Ref<boolean> = ref(false);
    const path:Ref<string | undefined> = ref();

    async function verifyDirectoryExist():Promise<void>{
        try {
            const data = await fetch("http://localhost:3000/checkDirectoriesIfNotExist");
            if(data.status == 404 || data.status == 500){
                throw 'okay';
            };
            const response:{ path:string } = await data.json();
            console.log(response)
            if(typeof response.path == 'string' && response.path !== ""){
                path.value = response.path;
            } else {
                throw new Error();
            }

        } catch (error) {
            directoryExist.value = true;
            configModal.value = true;
        }
    }

    return {
        directoryExist,
        configModal,
        path,
        verifyDirectoryExist
    }
});

export default directoryPath;
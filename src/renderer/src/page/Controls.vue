<script setup lang="ts">
import NavigateContainer from '@renderer/components/navigate/NavigateContainer.vue';
</script>

<template>
    <div>
        <RouterView v-slot="{ Component }">
            <Transition name="route" mode="out-in">
                <component :is="Component"></component>
            </Transition>
        </RouterView>
        <NavigateContainer/>
    </div>
</template>
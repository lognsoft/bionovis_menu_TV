<template>
    <RouterView v-slot="{ Component }">
        <Transition name="stream">
            <component :is="Component"/>
        </Transition>
    </RouterView>
</template>
<script setup lang="ts">
import useLanguageStore from '@renderer/stores/useLanguageStore';
import { storeToRefs } from 'pinia';
import HomePage from "@renderer/constants/HomePage";

const store = useLanguageStore();
const { language } = storeToRefs(store)
</script>

<template>
    <main>
        <section class="pt-[100px]">
            <div class="container mx-auto px-3">
                <h1 class="title w-full max-w-[450px]">{{ HomePage[language] }}</h1>
            </div>
        </section>
    </main>
</template>

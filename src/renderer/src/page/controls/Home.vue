<script setup lang="ts">
import useLanguageStore from '@renderer/stores/useLanguageStore';
import { storeToRefs } from 'pinia';
import HomePage from "@renderer/constants/HomePage";
import useRouteNavigate from '@renderer/stores/useRouteNavigate';

const store = useLanguageStore();
const navigate = useRouteNavigate();
const { language } = storeToRefs(store)
const { initialRouter } = storeToRefs(navigate);
</script>

<template>
    <main>
        <section class="pt-[100px]">
            <div class="container mx-auto px-3">
                <h1 class="title w-full max-w-[450px]">
                    <template v-if="initialRouter === null">
                        {{ HomePage[language] }}
                    </template>
                    <template v-else>
                        {{ initialRouter.name }}
                    </template>
                </h1>
            </div>
        </section>
    </main>
</template>

<script setup>

import Title from './Title.vue';
import { defineProps } from 'vue';

// in <script setup>
//const props=defineProps(['serviceInfo'])

const props = defineProps({
    serviceInfo: String,
    serviceName: String,
    serviceImage: String

});

console.log('image', props.serviceImage);
console.log('image', props.serviceInfo);
console.log('image', props.serviceName);
</script>

<template>
    <n-card :title="props.serviceName">
        <template #cover>
            <img :src="props.serviceImage">
        </template>
        <div class="card-content">
            {{ props.serviceInfo }}

        </div>

    </n-card>
</template>

<style scoped>
.n-card {
    max-width: 300px;
    margin: 15px;
}

.card-content {
    display: flex;
    flex-direction: column;
}
</style>

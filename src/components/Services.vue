<script setup>
import Title from './Title.vue';
import ServiceCard from './ServiceCard.vue';
import services from '../assets/services.json';

</script>

<template>
    <Title title="Servicios" />
    <div class="services-cont">
        <ServiceCard v-for="serviceInfo in services" :key="serviceInfo.id" :serviceInfo="serviceInfo.info"
        :serviceName="serviceInfo.service" 
        :serviceImage="serviceInfo.image" 
        />


    </div>
</template>

<style scoped>
.services-cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: center;
    background-color: #0d0378;
    height: 100%;
    padding: 10px;
    padding-top: 20px;
    padding-bottom: 40px;

}

.n-card {
    max-width: 300px;
    margin: 15px;
}

.card-content {
    display: flex;
    flex-direction: column;
}
</style>

<script setup>
import Title from './Title.vue';
import ProductionCard from './ProductionCard.vue';
import productions from '../assets/productions.json';

</script>

<template>
    <Title title="Producciones" />
    <div class="productions-cont">
        <ProductionCard v-for="serviceInfo in productions" :key="serviceInfo.id" :serviceInfo="serviceInfo.info"
        :serviceName="serviceInfo.service" 
        :serviceImage="serviceInfo.image" 
        />


    </div>
</template>

<style scoped>
.productions-cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: center;
    
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

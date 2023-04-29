<script setup>
import Navbar from './Navbar.vue';
const props = defineProps(['title'])
</script>

<template>
    <div class="title-cont">
        <span class="title-text">{{ props.title }}</span>
    </div>
</template>

<style scoped>
.title-cont {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    color: black;
    font-size: 30px;
  


}

.title-text {

    padding-left: 4%;
    font-weight: bold;
    text-shadow: 1px 1px 1px grey;
}
</style>

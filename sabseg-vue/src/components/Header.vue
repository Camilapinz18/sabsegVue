<script setup>
import Navbar from './Navbar.vue';
</script>

<template>
    <div class="main-img">
        <Navbar />
        <div class="welcome-cont">
            <h1 class="welcome-text">Lleva tus sesiones de ensayo a otro nivel</h1>
            <n-space>
                <n-button color="#0d0378">
                    Conócenos
                  
                </n-button>
            </n-space>
        </div>


    </div>
</template>

<style scoped>
.main-img {
    background-image: url('../assets/images/main2.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
}

.welcome-cont {
    width: 50%;
    margin-top: 20%;
    margin-left: 2%;

}

.welcome-text {
    color: white;
    font-size: 70px;
    text-shadow: 1px 1px 2px black;

}

.btn {
    background-color: #0d0378;
}
</style>

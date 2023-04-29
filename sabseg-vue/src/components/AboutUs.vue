<script setup>
import Title from './Title.vue';
</script>

<template>
    <Title title="Acerca de nosotros" dark='true' />
    <div class="about-cont">
        <div>
            <img class="side-img" src="../assets/images/about-us.jpg">
        </div>
        <div class="side-text">

            <div class="text-cont">
                <h3 class="about-title-text"> Nos complace que nos hayas visitado y estamos ansiosos por compartir contigo nuestra pasión por la música.
                </h3>
                <p class="about-content-text">Desde nuestras salas de ensayo completamente equipadas hasta nuestro equipo de alta calidad y nuestro personal amable y profesional, nos esforzamos por brindar una experiencia inigualable a todos nuestros clientes.</p>
                <div class="numbers-cont">
                    <div class="number">
                        <span>6+</span>
                        <strong>salas ensayo</strong>
                    </div>
                    <div class="number">
                        <span>15+</span>
                        <strong>producciones</strong>
                    </div>
                    <div class="number">
                        <span>50+</span>
                        <strong>equipos en alquiler</strong>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about-cont {

    display: flex;
    flex-direction: row;
    padding: 50px;

    align-items: center;
}

.about-title-text {
    font-size: 30px;


}

.side-text {

    width: 100%;
}



.about-content-text {
    font-size: 15px;
    text-align: justify;
    text-justify: inter-word;
}



.text-cont {

    display: flex;
    flex-direction: column;
    width: 100%;
}

.side-img {
    width: 80%;

}

.numbers-cont {
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;


}

.numbers-cont span {
    color: #0d0378;
    font-size: 45px;



}

.number {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


}
</style>

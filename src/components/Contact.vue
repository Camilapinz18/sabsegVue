<script setup>
import Title from './Title.vue';
</script>

<template>
    <Title title="Contacto" />
    <div class="contact-cont">

        <div class="text-cont">
            <div class="contact-text">
                Estamos encantados de que estés interesado en conocer más sobre nosotros. Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros. Nuestro equipo está aquí para ayudarte en todo lo que necesites.
            </div>
            <n-space vertical class="inputs-cont">
                <n-input v-model:value="value" type="text" placeholder="Tu nombre" />
                <n-input v-model:value="value" type="number" placeholder="Tu número de contacto" />
                <n-input v-model:value="value" type="email" placeholder="Tu email" />
                <n-input v-model:value="value" type="textarea" placeholder="Tu mensaje" />

                <n-button color="#0d0378">
                    Enviar
                </n-button>
            </n-space>
        </div>

        <div class="img-cont">
            <img class="side-img" src="../assets/images/contact.jpg">
        </div>


    </div>
</template>

<style scoped>
.contact-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;
}

.contact-text {
    font-size: 20px;
    margin-bottom: 20px;
}

.text-cont {
    width: 50%;
    height: 100%;
}

.inputs-cont {

    width: 100%;
}

.inputs-cont .n-input {

    margin-top: 10px;
}

.img-cont {
    width: 40%;
}

.side-img {
    width: 100%;
}
</style>

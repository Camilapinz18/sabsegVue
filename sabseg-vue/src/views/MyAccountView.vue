<script setup>
import SideMenu from '../components/SideMenu.vue'
import BuySteps from '../components/BuySteps.vue';
import ProfileInfo from '../components/ProfileInfo.vue';

import { ref, onMounted } from "vue";
import { RouterLink } from 'vue-router'
const showBuyStepsRef = ref(false);
const showAlertRef = ref(true);
const hasMembership = ref(false)

let showBuySteps = false
function purchaseMembership() {

    showBuyStepsRef.value = true
    showAlertRef.value = false
    console.log("ghola", showBuyStepsRef.value)
}

function checkIfUserHasMembership() {
    let randNumber = Math.round(Math.random() * 1)
    console.log("randNumber", randNumber)

    if (randNumber === 1) {
        hasMembership.value = true
        localStorage.setItem('hasMembership', true)
    } else if (randNumber === 0) {
        hasMembership.value = false
        localStorage.setItem('hasMembership', false)
    }

    console.log("has", hasMembership.value)
}

function logout() {

}

onMounted(() => checkIfUserHasMembership())
</script>

<template>
    <div class="bg-cont">
        <div class="main-cont">

            <n-card title="Mi cuenta" style="margin-bottom: 16px">
                <n-tabs default-value="profile" justify-content="space-evenly" type="line">
                    <n-tab-pane name="profile" tab="Mi perfil">
                        <div class="account-cont">
                            <div class="img-cont">
                                <img class="profile-img" src="../assets/images/profile.jpg" />
                            </div>
                            <div class="account-info">
                                <ProfileInfo />
                            </div>
                        </div>
                    </n-tab-pane>
                    <n-tab-pane name="membership" tab="Mis reservaciones">
                        <div class="membership-cont" v-if="!hasMembership">
                            <n-alert title="Aún no cuentas con reservas!" type="info">
                                Parece que aún no has realizado ninguna reservación. Reserva ahora!
                            </n-alert>

                            <n-button @click="purchaseMembership" color="#0d0378">
                                Reservar

                            </n-button>
                        </div>
                        <div v-if="showBuyStepsRef">
                            <BuySteps />
                        </div>
                        <div v-if="hasMembership">
                            <div class="account-cont">
                                <div class="img-cont">
                                    <img class="profile-img" src="../assets/images/ser5.jpg" />
                                </div>
                                <div class="account-info">
                                    <n-list hoverable clickable>
                                        <n-list-item>
                                            <n-thing title="Reservas" content-style="margin-top: 10px;">
                                                <span>Sala de ensayo 05</span>
                                            </n-thing>
                                        </n-list-item>

                                        <n-list-item>
                                            <n-thing title="Fecha" content-style="margin-top: 10px;">
                                                <span>02/02/23</span>
                                            </n-thing>
                                        </n-list-item>

                                        <n-list-item>
                                            <n-thing title="Horario" content-style="margin-top: 10px;">
                                                <span>03:00 p.m - 05:00 p.m</span>
                                            </n-thing>
                                        </n-list-item>
                                    </n-list>

                                </div>
                            </div>


                        </div>
                    </n-tab-pane>

                </n-tabs>

            </n-card>
            <n-button type="error">
                <RouterLink to="/">Cerrar sesion</RouterLink>
            </n-button>
        </div>

    </div>
</template>

<style scoped>
.bg-cont {
    /* background-image: url('../assets/images/login-bg.jpg'); */
    background-color: #0d0378;
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.membership-cont {

    display: flex;
    flex-direction: column;

    align-items: center;
}

.profile-img {
    width: 100%;
    border-radius: 50%;
}

.img-cont {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.account-info {
    width: 50%;
    padding-left: 3%;
}

.account-cont {
    display: flex;
    flex-direction: row;
    width: 100%;

    justify-content: space-evenly;
}

.membership-cont .n-button {
    margin: 20px;
}

.main-cont {
    width: 80%;
    background-color: white;
    height: max-content;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    padding: 20px;
}

.membership-img {
    height: fit-content
}

.card-membership {
    width: 50%;


}

.image-container {
    width: 300px;

    height: 100px;

    overflow: hidden;

}
</style>

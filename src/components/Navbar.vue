<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="main-cont">
        <div class="logo-cont">
            <img class="logo-img" src="../assets/images/logoW.png" />
        </div>
        <n-space class="navbar-cont">

            <n-tag v-model:checked="checked" checkable>
                Acerca de
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                Servicios
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                Galería
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                Producciones
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                Contacto
            </n-tag>
            <n-tag v-model:checked="checked" checkable>
                <RouterLink to="/login">
                    <n-space>
                        <n-button color="#0d0378">
                            Login

                        </n-button>
                    </n-space>
                </RouterLink>
            </n-tag>
        </n-space>
    </div>
</template>

<style scoped>
.main-cont {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    padding-top: 1%;
    padding-left: 2%;
}

.logo-cont {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 30%;
}

.logo-img {
    width: 100%;



}

.navbar-cont {

    height: 7%;
    width: fit-content;
    padding-right: 5%;
    display: flex;
    flex-direction: row;


}

.navbar-cont .n-tag {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    font-size: 15px;
}

.navbar-cont .n-tag:hover {
    background-color: rgba(0, 0, 0, 0);
}
</style>

<script setup>
import Title from './Title.vue';
</script>

<template>
    <div class="footer-cont">
        <div class="footer-info">
            <div>
                <img class="logo-img" src="../assets/images/logoW.png" />
                <div class="address-cont">
                    <div class="address">
                        
                        <span>Cll 00 # 00-00</span>
                        <span>Barrio xxxx</span>
                        <span>Bogotá</span>
                        <span>Colombia</span>
                        <span>+57 301 510 2356</span>
                    </div>
                                    </div>
                <h3>contacto@oldskullproducciones.com</h3>
                <n-back-top :right="100" />
            </div>

            <!-- <img class="map-image" src="../assets/images/map.png" /> -->
        </div>

    </div>
</template>

<style scoped>
.footer-cont {
    background-color: #0d0378;
    height: 30%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 40px;
    margin-top:20px
}

.footer-info {
    padding-top: 2%;
    width: 90%;
    display: flex;
    flex-direction: row;
    color: white;
    align-items: center;
}

.address {
    display: flex;
    flex-direction: column;
    margin: 10px;

}

.logo-img {
    width: 35%;
}

.address-cont {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    color: white;
}

.map-image {
    width: 30%;
}
</style>

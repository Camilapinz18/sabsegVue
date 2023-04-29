<script setup>
import Title from './Title.vue';
import memberships from '../assets/memberships.json'
</script>

<template>
    <Title title="Memberships" />
    <div class="memberships-cont">
        <n-list class="list-cont" v-for="membership in memberships" :key="membership.id" column>
            <template #header>
                <h3 class="name-text">{{ membership.name }}</h3>
            </template>
            <n-list-item>
                <n-thing class="info-text" title="" :description="membership.info">
                </n-thing>
            </n-list-item>
            <n-list-item>
                <div class="membership-img-cont">
                    <img class="membership-img" :src="membership.image" />
                </div>
            </n-list-item>
            <div class="numbers-cont">
                <div class="number">
                    <span>{{ membership.yachts }}+</span>
                    <strong>yachts</strong>
                </div>
                <div class="number">
                    <span>{{ membership.courses }}+</span>
                    <strong>courses</strong>
                </div>
                <div class="number">
                    <span>{{ membership.members }}+</span>
                    <strong>members</strong>
                </div>

            </div>
            <n-list-item>
                <div class="description-cont">
                    <n-descriptions class="description" label-placement="top" title="">
                        <n-descriptions-item>
                            <template #label>
                                <h2>Benefits</h2>
                            </template>
                            <li v-for="item in membership.benefits">


                                <span class="info-text">{{ item }}</span>
                            </li>
                        </n-descriptions-item>

                        <n-descriptions-item>
                            <template #label>
                                <h2 >Cost</h2>
                            </template>
                            <span class="info-text">{{ membership.cost }}</span>
                        </n-descriptions-item>

                    </n-descriptions>
                    <n-button type="info">
                        Purchase membership
                    </n-button>
                </div>

            </n-list-item>
        </n-list>
    </div>
</template>
  
<style scoped>
.list-cont {
    display: flex;
    flex-direction: column;
}

.memberships-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;



}

.memberships-cont .n-list {

    width: 80%;
}

.membership-img {
    width: 100%;
}

.membership-img-cont {
    width: 100%;
}

.name-text {
    margin-top: 60px;
    font-size: 30px;
}

.info-text {
    font-size: 17px;
}


.description-cont {

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.description {

    width: 80%;
    margin: 0 auto;
    padding-bottom: 20px;
    padding-top: 30px;
}

.numbers-cont {
    margin-top: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;


}

.numbers-cont span {
    color: #2080F0;
    font-size: 60px;



}

.number {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


}






















.numbers-cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.member-title {
    font-size: 30px;
    font-weight: bold;
}

.member-desc {
    text-shadow: 1px 1px 1px black;
}

.card-cont {
    width: 40%;
    height: fit-content;
    margin-right: 10%;
    color: white;
    text-shadow: 1px 1px 1px black;
}

.card1-img {
    background-image: url('../assets/images/crew-y1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 70vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.card2-img {
    background-image: url('../assets/images/cruise-y1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 70vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.card3-img {
    background-image: url('../assets/images/honor-y1.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 70vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.memberships-cont .n-card {
    width: 100%;
}

.accordion {
    width: min-content;
    margin-top: 30px;
}

.card-img {
    width: 100%;
}
</style>

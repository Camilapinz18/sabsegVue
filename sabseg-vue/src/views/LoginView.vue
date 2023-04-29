<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>
    <div class="bg-cont">
        <div class="login-cont">
            <div class="inputs">
                <img class="logo-img" src="../assets/images/logoB.png" />

                <n-card class="tab">
                    <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
                        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
                        <n-tab-pane name="signin" tab="Sign in">
                            <n-form>
                                <n-form-item-row label="Username">
                                    <n-input />
                                </n-form-item-row>
                                <n-form-item-row label="Password">
                                    <n-input />
                                </n-form-item-row>
                            </n-form>
                            <n-button type="info" block secondary strong>
                                <RouterLink to="/account">Sign in</RouterLink>
                            </n-button>
                        </n-tab-pane>
                        <n-tab-pane name="signup" tab="Sign up">
                            <n-form>
                                <n-form-item-row label="Full name">
                                    <n-input />
                                </n-form-item-row>
                                <n-form-item-row label="Password">
                                    <n-input />
                                </n-form-item-row>
                                <n-form-item-row label="Phone">
                                    <n-input />
                                </n-form-item-row>
                                <n-form-item-row label="Address">
                                    <n-input />
                                </n-form-item-row>
                            </n-form>
                            <n-button type="info" block secondary strong>
                                <RouterLink to="/account">Sign up</RouterLink>
                            </n-button>
                        </n-tab-pane>
                    </n-tabs>
                </n-card>

            </div>
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

.login-cont {
    width: 40%;
    background-color: white;
    height: 70%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
}

.image-side {
    height: 100%;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
}

.image-cont {
    width: 50%;
}

.logo-img {
    width: 95%;
}

.inputs {
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: center;
    align-items: center;
    padding-top: 5%;


}

.input {
    width: 100%;
    margin: 5px;
}

.tab {

    width: 100%;
}
</style>

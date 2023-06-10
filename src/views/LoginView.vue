<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const signUp = reactive({
  last: '',
  first: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const login = reactive({
  email: '',
  password: ''
});



// Sign-in user
const signInUser = () => {
  console.log("LOGIN", login);
  axios
    .post('api_url/signin', login)
    .then(response => {
      // Handle the response
      console.log(response.data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
};

// Register user
const registerUser = () => {
  console.log("IMPRIMIR", signUp);
  axios
    .post('http://localhost:8085/api/v1/customers', signUp)
    .then(response => {
      // Handle the response
      console.log(response.data);
      alert(response.data);
      router.push('/generic'); // Use router.push to navigate to '/account'
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
};
</script>

<template>
  <div class="bg-cont">
    <div class="login-cont">
      <div class="inputs">
        <img class="logo-img" src="../assets/images/logoB.png" />

        <n-card class="tab">
          <n-tabs class="card-tabs" default-value="signin" size="large" animated style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
            <n-tab-pane name="signin" tab="Iniciar sesión">
              <n-form>
                <n-form-item-row label="Email">
                  <n-input v-model:value="login.email" />
                </n-form-item-row>
                <n-form-item-row label="Contraseña">
                  <n-input v-model:value="login.password" />
                </n-form-item-row>
              </n-form>

              <n-button color="#0d0378" @click="signInUser">
                Iniciar sesión
              </n-button>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="Registrarse">
              <n-form>
                <n-form-item-row label="Nombres">
                  <n-input v-model:value="signUp.first" />
                </n-form-item-row>
                <n-form-item-row label="Apellidos">
                  <n-input v-model:value="signUp.last" />
                </n-form-item-row>
                <n-form-item-row label="Teléfono">
                  <n-input v-model:value="signUp.phone" />
                </n-form-item-row>
                <n-form-item-row label="Email">
                  <n-input v-model:value="signUp.email" />
                </n-form-item-row>
                <n-form-item-row label="Contraseña">
                  <n-input v-model:value="signUp.password" type="password" />
                </n-form-item-row>
                <n-form-item-row label="Confirme contraseña">
                  <n-input v-model:value="signUp.confirmPassword" type="password" />
                </n-form-item-row>
              </n-form>

              <n-button color="#0d0378" @click="registerUser">
                Registrarse
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
  height: 90%;
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

* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button+button {
  margin-left: 5px;
}
</style>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const names = reactive(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
const selected = ref('')
const prefix = ref('')
const first = ref('')
const last = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const prueba = ref('')
const value = ref(null);

const filteredNames = computed(() =>
  names.filter((n) =>
    n.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

watch(selected, (name) => {
  ;[last.value, first.value] = name.split(', ')
})

function create() {
  console.log("IMPRIMIR", last.value, first.value, phone.value, email.value, password.value, confirmPassword.value)
  if (hasValidInput()) {
    const fullName = `${last.value}, ${first.value}`
    if (!names.includes(fullName)) {
      names.push(fullName)
      first.value = last.value = ''
    }
  }
}

function update() {
  if (hasValidInput() && selected.value) {
    const i = names.indexOf(selected.value)
    names[i] = selected.value = `${last.value}, ${first.value}`
  }
}

function del() {
  if (selected.value) {
    const i = names.indexOf(selected.value)
    names.splice(i, 1)
    selected.value = first.value = last.value = ''
  }
}

function hasValidInput() {
  return first.value.trim() && last.value.trim()
}

//------------------------//

const signIn = {
  email: '',
  password: '',
};

const signUp = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

// Sign-in user
const signInUser = () => {
  axios
    .post('api_url/signin', signIn)
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
  console.log("IMPRIMIR", signUp.name)
  axios
    .post('http://localhost:8085/api/v1/customers', signUp)
    .then(response => {
      // Handle the response
      console.log(response.data);
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
                  <n-input v-model="signIn.email" />
                </n-form-item-row>
                <n-form-item-row label="Contraseña">
                  <n-input v-model="signIn.password" type="password" />
                </n-form-item-row>
              </n-form>

              <n-button color="#0d0378" @click="signInUser">
                Iniciar sesión
              </n-button>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="Registrarse">
              <n-form>
                <n-form-item-row label="Nombres">
                  <n-input v-model:value="first" />
                </n-form-item-row>
                <n-form-item-row label="Apellidos">
                  <n-input v-model:value="last" />
                </n-form-item-row>
                <n-form-item-row label="Teléfono">
                  <n-input v-model:value="phone" />
                </n-form-item-row>
                <n-form-item-row label="Email">
                  <n-input v-model:value="email" />
                </n-form-item-row>
                <n-form-item-row label="Contraseña">
                  <n-input v-model:value="password" type="password" />
                </n-form-item-row>
                <n-form-item-row label="Confirme contraseña">
                  <n-input v-model:value="confirmPassword" type="password" />
                </n-form-item-row>
              </n-form>

              <n-button color="#0d0378" @click="create">
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

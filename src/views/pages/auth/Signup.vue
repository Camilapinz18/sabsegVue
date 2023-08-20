<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, reactive } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import config from '@/config';

const router = useRouter();

const { layoutConfig } = useLayout();

const checked = ref(false);

const signUp = reactive({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    attendance: 0
});


const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const registerUser = () => {
    console.log("IMPRIMIR", signUp);
    axios
        .post(config.apiUrl + 'users', signUp)
        .then(response => {
            // Handle the response
            console.log(response.data);
            alert(response.data.msg);
            router.push('/pages/users'); // Use router.push to navigate to '/account'
        })
        .catch(error => {
            // Handle any errors
            console.error("ERROR",error.response.data.detail);
            alert(error.response.data.detail)
        });
};

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="../../../assets/images/logoB.png" alt="Image" height="80" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Crea una cuenta para continuar</span>
                    </div>

                    <div>
                        <label for="name" class="block text-900 text-xl font-medium mb-2">Nombres</label>
                        <InputText id="name" type="text" placeholder="Nombres" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="signUp.name" />

                        <label for="surname" class="block text-900 text-xl font-medium mb-2">Apellidos</label>
                        <InputText id="surname" type="text" placeholder="Nombres" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="signUp.surname" />

                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="signUp.email" />

                        <label for="phone" class="block text-900 text-xl font-medium mb-2">Teléfono</label>
                        <InputText id="phone" type="text" placeholder="Teléfono" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="signUp.phone" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="signUp.password" placeholder="Contraseña" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <label for="password2" class="block text-900 font-medium text-xl mb-2">Confirmar contraseña</label>
                        <Password id="password2" v-model="signUp.confirm_password" placeholder="Confirmar contraseña"
                            :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">

                        </div>
                        <Button @click="registerUser" label="Registrarse" class="w-full p-3 text-xl"></Button>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <span class="w-full p-3 text-xl text-center">o</span>
                        <RouterLink to="/">
                            <Button label="Iniciar sesión" class="w-full p-2 text-xl"></Button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

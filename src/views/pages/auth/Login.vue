<script setup>
import {useTokenStore} from '../../../stores/token'
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router'

const { layoutConfig } = useLayout();
const store=useTokenStore();
const router = useRouter();

const email = ref(null);
const password = ref(null);
const checked = ref(false);

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const login=()=>{

    const body={
        email:email.value,
        password:password.value
    }
    axios.post(config.apiUrl + 'auth/login', body)
            .then(response => {
                const token = response.data.token;
                const role = response.data.role;
                const id = response.data.id;

                store.setToken({ token, role, id });
                

               // alert('Inicio de sesion exitoso');
                router.push('/pages/users');
            })
            .catch(error => {
                console.log(error.response.status)
                if (error.response.status == 422){
                    alert("Por favor diligencia correctamente los datos")
                }else if (error.response.status == 404 || error.response.status == 401){
                    console.log(error.response.data.detail)
                    alert(error.response.data.detail)
                }
                    
                
            });
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="../../../assets/images/logoB.png" alt="Image" height="80" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenido!</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>

                    <div>
                        <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                        <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recuérdame</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">¿Olvidaste tu contraseña?</a>
                        </div> -->
                        <Button label="Iniciar sesión" class="w-full p-3 text-xl" @click="login"></Button>
                        
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <span class="w-full p-3 text-xl text-center">o</span>
                        <RouterLink to="/auth/signup">
                            <Button label="Crear una cuenta" class="p-button-outlined"></Button>
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

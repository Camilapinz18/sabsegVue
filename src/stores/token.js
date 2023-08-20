import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', () => {
    const token = ref({
        token: '',
        role: '',
        id: ''
    })

    const setToken=(token_received)=>{
        console.log("recibiido>>>>",token_received)
        token.value.token=token_received.token
        token.value.role=token_received.role
        token.value.id=token_received.id

        console.log("TOKENENENE>>>>>N",token.value.token)
        console.log("TOKENENENE>>>>>id",token.value.id)
        console.log("ZZZZZZZZZ",token)
        
    }

    const clearToken = () => {
        token.value.token = '';
        token.value.role = '';
        token.value.id = '';
    };

    return {
        token,
        setToken,
        clearToken
    } 
})

 
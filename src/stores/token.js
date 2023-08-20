import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', () => {
    const token = ref({
        token: '',
        role: ''
    })

    const setToken=(token_received)=>{
        token.value.token=token_received.token
        token.value.role=token_received.role

        console.log("TOKENENENE>>>>>N",token.value.token)
        console.log("ZZZZZZZZZ",token)
        
    }

    return {
        token,
        setToken
    } 
})

 
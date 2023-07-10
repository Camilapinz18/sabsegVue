import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: 'Matt',
        email: "matt@email.com"
    })

    return user
})

 
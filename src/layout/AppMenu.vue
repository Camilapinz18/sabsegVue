<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    
    {
        label: 'Módulos',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                to: '/pages/users'
            },
            {
                label: 'Equipos',
                icon: 'pi pi-fw pi-microphone',
                to: '/pages/equipment'
            },
            {
                label: 'Salas',
                icon: 'pi pi-fw pi-th-large',
                to: '/pages/rooms'
            },
            {
                label: 'Reservaciones',
                icon: 'pi pi-fw pi-clock',
                to: '/pages/reservations'
            },
        
        ]
    }

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item 
                v-if="!item.separator" 
                :item="item" :index="i">
            </app-menu-item>
            <li v-if="item.separator" 
                class="menu-separator">
            </li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>

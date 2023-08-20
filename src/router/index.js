import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { useTokenStore } from '../stores/token';



const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
        
                {
                    path: '/pages/users',
                    name: 'users',
                    component: () => import('@/views/pages/Users.vue'),
                    meta: { requiresAuth: true, allowedRoles: ['admin'] } 
                },
                {
                    path: '/pages/equipment',
                    name: 'equipment',
                    component: () => import('@/views/pages/Equipment.vue'),
                    meta: { requiresAuth: true, allowedRoles: ['admin'] } 
                },
                {
                    path: '/pages/rooms',
                    name: 'rooms',
                    component: () => import('@/views/pages/Rooms.vue'),
                    meta: { requiresAuth: true, allowedRoles: ['admin'] } 
                },
                {
                    path: '/pages/reservations',
                    name: 'reservations',
                    component: () => import('@/views/pages/Reservations.vue'),
                    meta: { requiresAuth: true, allowedRoles: ['admin', 'client'] } 
                },
                {
                    path: '/pages/reservations_create',
                    name: 'reservations_create',
                    component: () => import('@/views/pages/reservations/ReservationType.vue'),
                    meta: { requiresAuth: true, allowedRoles: ['admin','client'] } 
                },
                
            ]
        },
        

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        // {
        //     path: '/auth/signup',
        //     name: 'signup',
        //     component: () => import('@/views/pages/auth/Signup.vue')
        // },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/pages/home/HomeView.vue'),
            meta: { requiresAuth: true, allowedRoles: ['admin','client'] } 
        }
    ]
})

router.beforeEach((to, from, next) => {
    const tokenStore = useTokenStore(); // Accede al store de tokens
    console.log("BEFORE EACH TOKEN STORE_______");
    console.log(tokenStore);
    const userRole = tokenStore.token.role; // Obtén el rol del usuario
    console.log("userrole")
    console.log(userRole)
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log("permisossososososo")
        console.log(to.meta.allowedRoles)
      if (userRole && to.meta.allowedRoles.includes(userRole)) {
        next(); // Usuario tiene permiso para acceder
      } else {
        // Usuario no tiene permiso para acceder

        next({ name: 'reservations' }); // Redirigir a la página de inicio o a otra página
      }
    } else {
      next(); // Página pública, permitir acceso
    }
  });

  

export default router;

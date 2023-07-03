<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import config from '@/config';
import ProductService from '@/service/ProductService';
import PhotoService from '@/service/PhotoService';

const router = useRouter();
const toast = useToast();
const loading = ref([false, false, false]);

const images = ref([]);
const products = ref([]);
const productService = new ProductService();
const photoService = new PhotoService();

//Options variables:
const reservationTypeOptions = ref([{ name: 'Sala de ensayo' }, { name: 'Estudio de grabación' }]);
const endHour = ref([{ name: '1 hora', code: 1 }, { name: '2 horas', code: 2 }, { name: '3 horas', code: 3 }]);

const hours = ref([
    { name: '9:00 a.m.', code: '09:00' },
    { name: '10:00 a.m', code: '10:00' },
    { name: '11:00 a.m', code: '11:00' },
    { name: '12:00 p.m', code: '12:00' },
    { name: '01:00 p.m', code: '13:00' },
    { name: '02:00 p.m', code: '14:00' },
    { name: '03:00 p.m', code: '15:00' },
    { name: '04:00 p.m', code: '16:00' },
    { name: '05:00 p.m', code: '17:00' },
    { name: '06:00 p.m', code: '18:00' },
    { name: '07:00 p.m', code: '19:00' },
    { name: '08:00 p.m', code: '20:00' },
    { name: '09:00 p.m', code: '21:00' }
]);

//User selections
const selectedRoomType = ref(null);
const selectedEndHour = ref(null);
const calendarValue = ref(null);
const selectedRoom = ref(null);
const selectedEquipments = ref([]);
const selectedStartHour = ref(null);

//Control variables:
const showList = ref(false);
const displayConfirmationReservation = ref(false);
const continueReservation = ref(false);

//API methods:
const confirmReservation = () => {
    let equipments_ids = []
    for (let e of selectedEquipments.value) {
        equipments_ids.push(e.id)
    }

    const body = {
        date: calendarValue.value.toISOString().split('T')[0],
        start_hour: selectedStartHour.value.code,
        end_hour: generateEndHour(),
        client_id: 1,
        reservation_type: 1,
        room_id: selectedRoom.value.id,
        equipments: equipments_ids
    }
    
    axios
        .post(config.apiUrl + 'reservations', body)
        .then(response => {
            displayConfirmationReservation.value=false
            continueReservation.value=false
            //showSuccess()
            alert(response.data.msg)
            router.push('/pages/users');  
        })
        .catch(error => {
            console.error(error);
        });
}

//Display methods:
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Reserva creada', detail: 'Reserva creada exitosamente', life: 3000 });}
    
const open = () => {
    continueReservation.value = true;
};

const close = () => {
    continueReservation.value = false;
};
const load = (index) => {
    loading.value[index] = true;
    setTimeout(() => (loading.value[index] = false), 1000);
};

const selectRoom = (index) => {
    console.log("holiwis", index)
    selectedRoom.value = index
}
const selectEquipments = (index) => {

    selectedEquipments.value.push(index)
    console.log("selectedEquipments", selectedEquipments)
}
onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
    photoService.getImages().then((data) => (images.value = data));
});
const carouselResponsiveOptions = ref([
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]);

const displayConfirmation = ref(false);
const currentStepIndex = computed(() => {
    return nestedRouteItems.value.findIndex((item) => item.to === window.location.pathname);
});

const roomsAvailable = ref(null);
const equipmentsAvailable = ref(null);

const generateEndHour = () => {



    const time = new Date(`2000-01-01T${selectedStartHour.value.code}`);


    // Add the specified hours to the time
    time.setHours(time.getHours() + selectedEndHour.value.code);

    // Format the time as a string in the format 'HH:mm'
    const newTimeStr = time.toTimeString().slice(0, 5);
    console.log('newTimeStr>>>>>', newTimeStr)
    return newTimeStr;
}

const handleSearch = () => {


    if (selectedRoomType.value && calendarValue.value && selectedStartHour.value && endHour.value) {
        // Perform the search logic here


        const generatedEndHour = generateEndHour()
        const date = calendarValue.value.toISOString().split('T')[0];
        console.log("date>>>>", date)

        const body = { // Declare the update_data variable
            date: date,
            start_hour: selectedStartHour.value.code,
            end_hour: generatedEndHour
        }
        console.log('Search triggered');


        axios
            .post(config.apiUrl + 'rooms/available/', body)
            .then(response => {
                roomsAvailable.value = response.data
                showList.value = true
            })
            .catch(error => {
                console.error(error);
            });

        console.log("roomsAvailable", roomsAvailable)

        axios
            .post(config.apiUrl + 'equipments/available/', body)
            .then(response => {
                equipmentsAvailable.value = response.data
                showList.value = true
            })
            .catch(error => {
                console.error(error);
            });

        console.log("equipmentsAvailable", equipmentsAvailable)


    } else {
        console.log("acaelse")
        // Display an error message or perform any required validation
        openConfirmation()


    }
};




const orderlistValue = ref([
    { name: 'San Francisco', code: 'SF' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Berlin', code: 'BRL' },
    { name: 'Barcelona', code: 'BRC' },
    { name: 'Rome', code: 'RM' }
]);

const dataviewValue = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
]);



onMounted(() => {
    productService.getProductsSmall().then((data) => (dataviewValue.value = data));
});
const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};
const openConfirmation = () => {
    displayConfirmation.value = true;
};

</script>

<template>
    <Toast />
    <div class="grid p-fluid d-flex flex-column align-items-center">
        <div class="card col-8 mx-auto mb-3">
            <h5>¿Qué quieres reservar?</h5>
            <SelectButton v-model="selectedRoomType" :options="reservationTypeOptions" optionLabel="name" />
        </div>

        <div class="card col-8 mx-auto">
            <h5>¿Para qué fecha quieres reservar?</h5>
            <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue"></Calendar>
        </div>

        <div class="card col-8 mx-auto">
            <span class="p-float-label">
                <h5>Hora de inicio</h5>
                <Dropdown id="dropdown" :options="hours" v-model="selectedStartHour" optionLabel="name"></Dropdown>
            </span>
        </div>

        <div class="card col-8 mx-auto mb-3">
            <h5>Duración del bloque</h5>
            <SelectButton v-model="selectedEndHour" :options="endHour" optionLabel="name" />
        </div>

        <div class="card col-8 mx-auto mb-3">
            <Button type="button" class="mr-2 mb-2" label="Buscar salas y equipos disponibles" icon="pi pi-search"
                :loading="loading[0]" @click="handleSearch" />
        </div>

        <Dialog header="Error!" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Por favor complete todos los campos para continuar</span>
            </div>

        </Dialog>

        <div v-if="showList" class="col-12">
            <div class="card">
                <h5>Salas disponibles</h5>
                <DataView :value="roomsAvailable" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
                    :sortField="sortField">


                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">

                                <div class="text-center">
                                    <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name"
                                        class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>

                                </div>
                                <div class="flex align-items-center justify-content-between">

                                    <Button icon="pi pi-plus" class="p-button-rounded p-button-success mr-2 mb-2 mx-auto"
                                        @click="selectRoom(slotProps.data)" />
                                </div>
                            </div>
                        </div>
                    </template>

                </DataView>
            </div>
        </div>
        <div v-if="showList" class="col-12">
            <div class="card">
                <h5>Equipos disponibles</h5>
                <DataView :value="equipmentsAvailable" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder"
                    :sortField="sortField">


                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">

                                <div class="text-center">
                                    <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name"
                                        class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-2xl font-bold">{{ slotProps.data.brand }}</div>
                                    <div class="text-2xl font-regular">{{ slotProps.data.reference }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>

                                </div>
                                <div class="flex align-items-center justify-content-between">

                                    <Button icon="pi pi-plus" class="p-button-rounded p-button-success mr-2 mb-2 mx-auto"
                                        @click="selectEquipments(slotProps.data)" />
                                </div>
                            </div>
                        </div>
                    </template>

                </DataView>
            </div>
        </div>
        <div v-if="showList" class="card col-8 mx-auto mb-3">
            <Button label="Continuar" class="p-button-raised p-button-success mr-2 mb-2" @click="open" />
        </div>





        <Dialog header="Resumen de la reserva" v-model:visible="continueReservation" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">
            <div class="card">
                <h5>Datos reserva</h5>
                <Chip :label="selectedRoomType.name" class="mr-2 mb-2"></Chip>
                <Chip :label="selectedStartHour.name" class="mr-2 mb-2"></Chip>
                <Chip :label="generateEndHour() + ' p.m.'" class="mr-2 mb-2"></Chip>
                <Chip :label="selectedRoom.name" class="mr-2 mb-2"></Chip>
            </div>
            <div class="card">
                <h5>Equipos seleccionados</h5>
                <Chip v-for="e in selectedEquipments" :key="e.id" :label="e.brand + ' ' + e.reference" class="mr-2 mb-2">
                </Chip>
            </div>
            <template #footer>
                <Button label="Confirmar reserva" @click="displayConfirmationReservation=true" icon="pi pi-check"
                    class="p-button-outlined" />
            </template>
        </Dialog>


        <Dialog header="Confirmation" v-model:visible="displayConfirmationReservation" :style="{ width: '350px' }" :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Al dar click en continuar su reservación será creada</span>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                <Button label="Continuar" icon="pi pi-check" @click="confirmReservation" class="p-button-text" autofocus  />
            </template>
        </Dialog>



    </div>
</template>

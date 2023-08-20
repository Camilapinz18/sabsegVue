<script setup>
import { ref, computed, onMounted } from 'vue';
import {useTokenStore} from '../../../stores/token'
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import config from '@/config';
import ProductService from '@/service/ProductService';
import PhotoService from '@/service/PhotoService';

const router = useRouter();
const store=useTokenStore();
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

//Display variables:
const layout = ref('grid');
const sortOrder = ref(null);
const sortField = ref(null);
const showList = ref(false);
const displayConfirmationReservation = ref(false);
const continueReservation = ref(false);
const displayConfirmation = ref(false);

//API variables:
const roomsAvailable = ref(null);
const equipmentsAvailable = ref(null);

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
    photoService.getImages().then((data) => (images.value = data));
});

//API methods:
const searchRoomsAndEquipments = () => {
    if (selectedRoomType.value && calendarValue.value && selectedStartHour.value && endHour.value) {
        const generatedEndHour = generateEndHour()
        const date = calendarValue.value.toISOString().split('T')[0];

        const body = {
            date: date,
            start_hour: selectedStartHour.value.code,
            end_hour: generatedEndHour
        }

        axios
            .post(config.apiUrl + 'rooms/available/', body)
            .then(response => {
                roomsAvailable.value = response.data
                showList.value = true
            })
            .catch(error => {
                console.error(error);
            });

        axios
            .post(config.apiUrl + 'equipments/available/', body)
            .then(response => {
                equipmentsAvailable.value = response.data
                showList.value = true
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        openConfirmation()
    }
};

const toggleEquipmentsSelection = (equipment) => {
  if (isSelected(equipment)) {
    // Si el equipo ya está seleccionado, lo quitamos de la lista
    selectedEquipments.value = selectedEquipments.value.filter(eq => eq !== equipment);
  } else {
    // Si el equipo no está seleccionado, lo añadimos a la lista
    selectedEquipments.value.push(equipment);
  }

  console.log(selectedEquipments.value)
};

// Función para verificar si un equipo está seleccionado
const isSelected = (equipment) => selectedEquipments.value.includes(equipment);

const confirmReservation = () => {
    let equipments_ids = []
    for (let e of selectedEquipments.value) {
        equipments_ids.push(e.id)
    }

    const body = {
        date: calendarValue.value.toISOString().split('T')[0],
        start_hour: selectedStartHour.value.code,
        end_hour: generateEndHour(),
        client_id: store.token.id,
        reservation_type: 1,
        room_id: selectedRoom.value.id,
        equipments: equipments_ids
    }

    axios
        .post(config.apiUrl + 'reservations', body, {
            headers:{
                Authorization: `Bearer ${store.token.token}`
            }
        })
        .then(response => {
            displayConfirmationReservation.value = false
            continueReservation.value = false
            //showSuccess()
            alert(response.data.msg)
            router.push('/pages/reservations');
        })
        .catch(error => {
            console.error(error);
        });
}

//logic method:
const selectRoom = (room) => {
  selectedRoom.value = selectedRoom.value === room ? null : room;
  console.log(selectedRoom.value    )
};

const isSelectedRoom = (room) => selectedRoom.value === room;

const selectEquipments = (index) => {
    selectedEquipments.value.push(index)
    console.log("seleciconado equipos")
    console.log(selectedEquipments.value)
}

const generateEndHour = () => {
    const time = new Date(`2000-01-01T${selectedStartHour.value.code}`);
    time.setHours(time.getHours() + selectedEndHour.value.code);
    const newTimeStr = time.toTimeString().slice(0, 5);

    return newTimeStr;
}

//Display methods:
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'Reserva creada', detail: 'Reserva creada exitosamente', life: 3000 });
}

const open = () => {
    continueReservation.value = true;
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
                :loading="loading[0]" @click="searchRoomsAndEquipments" />
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
                                   
                                    <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>

                                </div>
                                <div class="flex align-items-center justify-content-between">

                                    <Button
          :icon="isSelectedRoom(slotProps.data) ? 'pi pi-minus' : 'pi pi-plus'"
          :class="{'p-button-rounded': true, 'p-button-danger': isSelectedRoom(slotProps.data), 'p-button-success': !isSelectedRoom(slotProps.data), 'mr-2': true, 'mb-2': true, 'mx-auto': true}"
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
                                   
                                    <div class="text-2xl font-bold">{{ slotProps.data.brand }}</div>
                                    <div class="text-2xl font-regular">{{ slotProps.data.reference }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>

                                </div>
                                <div class="flex align-items-center justify-content-between">

                                    <Button
                                        :icon="isSelected(slotProps.data) ? 'pi pi-minus' : 'pi pi-plus'"
                                        :class="{'p-button-rounded p-button-danger': isSelected(slotProps.data),
                                                'p-button-rounded p-button-success': !isSelected(slotProps.data)}"
                                        :mr="2" :mb="2" :mx-auto="true"
                                        @click="toggleEquipmentsSelection(slotProps.data)" />
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
                <Button label="Confirmar reserva" @click="displayConfirmationReservation = true" icon="pi pi-check"
                    class="p-button-outlined" />
            </template>
        </Dialog>

        <Dialog header="Confirmation" v-model:visible="displayConfirmationReservation" :style="{ width: '350px' }"
            :modal="true">
            <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Al dar click en continuar su reservación será creada</span>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                <Button label="Continuar" icon="pi pi-check" @click="confirmReservation" class="p-button-text" autofocus />
            </template>
        </Dialog>

    </div>
</template>

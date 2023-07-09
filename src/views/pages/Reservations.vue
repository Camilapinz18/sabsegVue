<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, nextTick } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useRouter } from 'vue-router';
import config from '@/config';
import Calendar from '../../components/Calendar.vue'

const events = ref([
  {
    id: 1,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 1",
    time: { start: "2022-01-01 12:00", end: "2022-01-01 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 2,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 2",
    time: { start: "2023-01-11 12:00", end: "2023-01-11 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 3,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 3",
    time: { start: "2023-01-11 12:00", end: "2023-01-11 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 4,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 4",
    time: { start: "2023-01-11 12:00", end: "2023-01-11 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 5,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 5",
    time: { start: "2023-01-11 12:00", end: "2023-01-11 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 6,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 6",
    time: { start: "2023-01-11 12:00", end: "2023-01-11 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 7,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 7",
    time: { start: "2023-01-06 12:00", end: "2023-01-06 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 8,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 8",
    time: { start: "2023-01-19 12:00", end: "2023-01-19 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 9,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 9",
    time: { start: "2023-01-19 12:00", end: "2023-01-19 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 10,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 10",
    time: { start: "2023-01-15 12:00", end: "2023-01-15 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 11,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 11",
    time: { start: "2023-01-15 12:00", end: "2023-01-15 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
  {
    id: 12,
    url: "https://github.com/dev-charles15531",
    title: "Dummy Event Name 12",
    time: { start: "2023-01-02 12:00", end: "2023-01-02 14:00" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
    image: "test-img.png",
    tags: "#fun #nightout #dance #veterantime",
    location: "At the base",
  },
]);

const toast = useToast();
const router = useRouter();

const products = ref(null);
const categories = ref(null);
const equipments = ref(null);
const user = ref(null);
const productDialog = ref(false);
const updateProductDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const detailsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'DISPONIBLE', value: 'available' },
    { label: 'MANTENIMIENTO', value: 'maitenance' },
    { label: 'RESERVADO', value: 'reserved' }
]);


onBeforeMount(() => {
    initFilters();

});
onMounted(async () => {
    axios
        .get(config.apiUrl + 'reservations')
        .then(response => {
            products.value = response.data
        })
        .catch(error => {
            console.error(error);
        });

    axios
        .get(config.apiUrl + 'rooms/categories/')
        .then(response => {
            categories.value = response.data
        })
        .catch(error => {
            console.error(error);
        });

    console.log("reservations", products)
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    // product.value = {};
    // submitted.value = false;
    // productDialog.value = true;

    router.push('/pages/reservations_create');
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveRoom = () => {
    console.log("product", product.value)
    submitted.value = true;

    const create_data = { // Declare the update_data variable
        name: product.value.name,
        status: product.value.inventoryStatus.value,
        category_name: product.value.category,

    }

    axios.post(config.apiUrl + `rooms`, create_data)
        .then(response => {
            toast.add({ severity: 'success', summary: 'Correcto', detail: 'Equipo creado correctamente', life: 3000 });
            products.value[findIndexById(product.value.id)] = product.value;
            updateProductDialog.value = false;
            product.value = {};
        })
        .catch(error => {
            console.error(error);
        });

};

const seeDetails = async (equipmentIndex, userIndex) => {

    axios
        .get(config.apiUrl + `reservations/${equipmentIndex}`)
        .then(response => {
            equipments.value = response.data.equipments
            console.log("RTA", response.data.equipments)
        })
        .catch(error => {
            console.error(error);
        });

    axios
        .get(config.apiUrl + `users/${userIndex}`)
        .then(response => {
            user.value = response.data
            console.log("USER", response.data)
        })
        .catch(error => {
            console.error(error);
        });


    detailsDialog.value = true
}

const updateRoom = () => {
    submitted.value = true;


    const update_data = { // Declare the update_data variable
        name: product.value.name,
        status: product.value.inventoryStatus.value,
        category_name: product.value.category,
    }

    axios.put(config.apiUrl + `rooms/${product.value.id}`, update_data)
        .then(response => {
            toast.add({ severity: 'success', summary: 'Correcto', detail: 'Equipo actualizado correctamente', life: 3000 });
            products.value[findIndexById(product.value.id)] = product.value;
            productDialog.value = false;
            product.value = {};
        })
        .catch(error => {
            console.error(error);
        });

};


const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    updateProductDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Equipo eliminado', life: 3000 });


    axios.delete(config.apiUrl + `rooms/${product.value.id}`)
        .then(response => {
            
            product.value = {};
        })
        .catch(error => {
            console.error(error);
        });
}

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedUsers = () => {
    selectedProducts.value.forEach((product) => {
        const userId = product.id;

        axios.delete(config.apiUrl + `rooms/${userId}`)
            .then(response => {
                products.value = products.value.filter((product) => !selectedProducts.value.includes(product));

                deleteProductsDialog.value = false;
                selectedProducts.value = null

                toast.add({ severity: 'success', summary: 'Correcto', detail: 'Equipos eliminados', life: 3000 });
            })
            .catch(error => {
                console.error(error);
            });
    });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>

<template>
    <div class="grid">
        
        <div class="col-12">
            <div class="card">
                <Calendar :events="events"></Calendar>
                
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Crear reserva" icon="pi pi-plus" class="p-button-success mr-2"
                                @click="openNew" />
                            <Button label="Eliminar" icon="pi pi-trash" class="p-button-danger"
                                @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                    :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} usuarios"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Gestión de usuarios</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="id" header="ID" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">ID</span>
                            {{ slotProps.data.id }}
                        </template>
                    </Column>
                    <Column field="name" header="Fecha" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Fecha</span>
                            {{ slotProps.data.date }}
                        </template>
                    </Column>
                    <Column field="phone" header="Hora Inicio" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Hora Inicio</span>
                            {{ slotProps.data.start_hour }}
                        </template>
                    </Column>
                    <Column field="phone" header="Hora Final" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Hora Final</span>
                            {{ slotProps.data.end_hour }}
                        </template>
                    </Column>
                    <Column field="phone" header="Tipo reserva" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Tipo reserva</span>
                            {{ slotProps.data.reservation.name }}
                        </template>
                    </Column>
                    <Column field="phone" header="Sala" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Sala</span>
                            {{ slotProps.data.room.name }}
                        </template>
                    </Column>


                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-rounded mr-2"
                                @click="seeDetails(slotProps.data.id, slotProps.data.client.id)" />
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>


                <Dialog v-model:visible="detailsDialog" header="Detalles de reserva" :modal="true" class="p-fluid col-8">
                    <img :src="'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="card">



                        <TabView>
                            <TabPanel header="Equipos reservados">

                                <DataTable ref="dt" :value="equipments" v-model:selection="selectedProducts" dataKey="id"
                                    responsiveLayout="scroll">



                                    <Column field="id" header="ID" :sortable="true"
                                        headerStyle="width:14%; min-width:10rem;">
                                        <template #body="slotProps">
                                            <span class="p-column-title">ID</span>
                                            {{ slotProps.data.id }}
                                        </template>
                                    </Column>
                                    <Column field="brand" header="Marca" :sortable="true"
                                        headerStyle="width:14%; min-width:10rem;">
                                        <template #body="slotProps">
                                            <span class="p-column-title">ID</span>
                                            {{ slotProps.data.brand }}
                                        </template>
                                    </Column>
                                    <Column field="reference" header="Referencia" :sortable="true"
                                        headerStyle="width:14%; min-width:10rem;">
                                        <template #body="slotProps">
                                            <span class="p-column-title">ID</span>
                                            {{ slotProps.data.reference }}
                                        </template>
                                    </Column>
                                    <Column field="category_name" header="Categoría" :sortable="true"
                                        headerStyle="width:14%; min-width:10rem;">
                                        <template #body="slotProps">
                                            <span class="p-column-title">ID</span>
                                            {{ slotProps.data.category_name }}
                                        </template>
                                    </Column>

                                </DataTable>


                            </TabPanel>
                            <TabPanel header="Cliente">
                                <div class="card">
                                    <div class="avatar-container">
                                        <Avatar icon="pi pi-user" class="mr-2" size="xlarge"></Avatar>
                                        <div class="text-container">
                                            <div v-for="u in user">{{ u }}</div>
                                        </div>

                                    </div>
                                </div>

                            </TabPanel>

                        </TabView>

                    </div>




                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateRoom" />
                    </template>
                </Dialog>


                <Dialog v-model:visible="updateProductDialog" :style="{ width: '450px' }" header="Editar sala" :modal="true"
                    class="p-fluid">
                    <img :src="'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">El nombre es requerido</small>
                    </div>

                    <div class="field">
                        <label class="mb-3">Categoría</label>
                        <div class="formgrid grid">
                            <div v-for="category in categories" :key="category.id" class="field-radiobutton col-6">
                                <RadioButton :id="`category${category.id}`" name="category" :value="category.id"
                                    v-model="product.category" />
                                <label :for="`category${category.id}`">{{ category.name }}</label>
                            </div>
                        </div>
                    </div>



                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Estado</label>
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                            optionLabel="label" placeholder="Seleccione un estado">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label
                                    }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                                        slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>


                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="updateRoom" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Añadir nueva sala" :modal="true"
                    class="p-fluid">
                    <img :src="'demo/images/product/' + product.image" :alt="product.image" v-if="product.image" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="name">Nombre</label>
                        <InputText id="name" v-model.trim="product.name" required="true" autofocus
                            :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">El nombre es requerido</small>
                    </div>

                    <div class="field">
                        <label class="mb-3">Categoría</label>
                        <div class="formgrid grid">
                            <div v-for="category in categories" :key="category.id" class="field-radiobutton col-6">
                                <RadioButton :id="`category${category.id}`" name="category" :value="category.id"
                                    v-model="product.category" />
                                <label :for="`category${category.id}`">{{ category.name }}</label>
                            </div>
                        </div>
                    </div>



                    <div class="field">
                        <label for="inventoryStatus" class="mb-3">Estado</label>
                        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses"
                            optionLabel="label" placeholder="Seleccione un estado">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.value">{{ slotProps.value.label
                                    }}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span :class="'product-badge status-' + slotProps.value.toLowerCase()">{{
                                        slotProps.value }}</span>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                        </Dropdown>
                    </div>


                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveRoom" />
                    </template>
                </Dialog>


                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Estás seguro de eliminar <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
                        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">¿Estás seguro de eliminar los equipos seleccionados?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false" />
                        <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';

.avatar-container {
    display: flex;
    align-items: center;
}

.text-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
}</style>

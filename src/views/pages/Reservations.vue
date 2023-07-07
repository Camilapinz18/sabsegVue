<script setup>
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount, nextTick } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useRouter } from 'vue-router';
import config from '@/config';

const toast = useToast();
const router = useRouter();

const products = ref(null);
const categories = ref(null);
const productDialog = ref(false);
const updateProductDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
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

        console.log("reservations",products)
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
    console.log("product",product.value)
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

    axios.delete(config.apiUrl + `rooms/${product.value.id}`)
        .then(response => {
            deleteProductDialog.value = false;
            product.value = {};
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Equipo eliminado', life: 3000 });
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
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="Crear reserva" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
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
                    <Column field="name" header="Sala" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Sala</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="phone" header="Estado" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span class="p-column-title">Estado</span>
                            <span
                                :class="'product-badge status-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">
                                {{ slotProps.data.status }}</span>

                        </template>
                    </Column>
                    

                    <Column headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>





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

                <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Añadir nueva sala"
                    :modal="true" class="p-fluid">
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

<style scoped lang="scss">@import '@/assets/demo/styles/badges.scss';</style>

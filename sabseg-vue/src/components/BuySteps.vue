<template>
  <n-dialog-provider>
    <div class="main-buy-cont">
      <div class="steps-cont">
        <n-steps v-model:current="current">
          <n-step title="Elige el servicio" description="Selecciona el servicio que quieres reservar"
            @click="setIsMembership" />
          <n-step title="Reserva tu servicio" description="Selecciona los detalles de tu reserva"
            @click="setIsPaymentMethod" />
          <n-step title="Confirma tu reserva" description="Revisa y confirma tu reservación" @click="setIsConfirmation" />
        </n-steps>
      </div>

      <div class="radios" v-if="isMembership">
        <strong>Selecciona el servicio que quieres reservar:</strong>
        <n-radio-group v-model:value="membershipSelected" name="radiogroup">
          <n-space>
            <n-radio class="radio" v-for="membership in memberships" :key="membership.value" :value="membership.value"
              :label="membership.label" />
          </n-space>
        </n-radio-group>
      </div>

      <div class="payment-method" v-if="isPaymentMethod">
        <!-- <n-collapse default-expanded-names="1" accordion>
          <n-collapse-item title="Credit card" name="1">
            <div>
              <n-input v-model:value="cardholderName" type="text" placeholder="Cardholder Name" />
              <n-input v-model:value="cardNumber" type="number" placeholder="Card Number" />
              <n-input v-model:value="expirationDate" type="date" placeholder="" />
              <n-input v-model:value="cvv" type="number" placeholder="CVV" />
              <n-input v-model:value="billingAddress" type="text" placeholder="Billing Address" />

              <n-radio-group v-model:value="methodSelected" name="radiogroup">
                <n-space>
                  <n-radio class="radio" v-for="method in methods" :key="method.value" :value="method.value"
                    :label="method.label" />
                </n-space>
              </n-radio-group>
            </div>
            <n-button @click="pay" type="info">
              Pay
            </n-button>

          </n-collapse-item>
          <n-collapse-item title="PayPal" name="2">
            <div>
              <n-input v-model:value="value" type="text" placeholder="Email" />
              <n-input v-model:value="value" type="text" placeholder="Password" />

              <n-button type="info">
                Login with PayPal
              </n-button>

            </div>
          </n-collapse-item>
        </n-collapse> -->

      </div>


      <div v-if="isConfirmation">
        <n-list class="profile-info" hoverable clickable>
          <n-list-item>
            <n-thing title="Servicio reservado" content-style="margin-top: 10px;">
              <span>Sala de ensayo</span>
            </n-thing>
          </n-list-item>

          <n-list-item>
            <n-thing title="Sala" content-style="margin-top: 10px;">
              <span>Sala 05</span>
            </n-thing>
          </n-list-item>

          <n-list-item>
            <n-thing title="Fecha" content-style="margin-top: 10px;">
              <span>02/02/2023 03:00 p.m - 05:00 p.m</span>
            </n-thing>
          </n-list-item>

        </n-list>

        <n-button color="#0d0378">
          Confirmar reserva

        </n-button>


      </div>
    </div>
  </n-dialog-provider>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDialog } from 'naive-ui'


const current = ref(0);
const membershipSelected = ref(null);
const methodSelected = ref(null);

const cardholderName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const cvv = ref('');
const billingAddress = ref('');

const isMembership = ref(false);
const isPaymentMethod = ref(false);
const isConfirmation = ref(false);
const hasMembership = ref(false)


function setIsMembership() {
  isPaymentMethod.value = false
  isConfirmation.value = false
  isMembership.value = true
}

function setIsPaymentMethod() {
  isMembership.value = false
  isConfirmation.value = false
  isPaymentMethod.value = true

}

function setIsConfirmation() {
  isMembership.value = false
  isPaymentMethod.value = false
  isConfirmation.value = true
}

function syncLocalStorage() {
  hasMembership.value = localStorage.getItem('hasMembership')
  console.log("hasMem", hasMembership.value)
}

function pay() {

  if (membershipSelected.value === null) {
    alert('Please select a Membership')

    console.log(cardNumber.value, "tttt")
  } else if (cardholderName.value === '' ||
    cardNumber === '' ||
    expirationDate === '' ||
    cvv === '' ||
    billingAddress === '' ||
    methodSelected === null
  ) {
    console.log('vacio')
    alert('Please fill the complete information to continue')
  } else {
    alert('Payment completeed successfuly')


  }
}

const memberships = [
  {
    value: "sala_ensayo",
    label: "Sala de ensayo"
  },
  {
    value: "estudio_grabacion",
    label: "Estudio de grabación"
  },
  {
    value: "alquiler_sonido",
    label: "Alquiler de sonido"
  }
].map((s) => {
  s.value = s.value.toLowerCase();
  return s;
});

const methods = [
  {
    value: "master",
    label: "Master Card"
  },
  {
    value: "visa",
    label: "Visa"
  },
  {
    value: "amex",
    label: "American Express"
  }
].map((s) => {
  s.value = s.value.toLowerCase();
  return s;
});

onMounted(() => syncLocalStorage())
</script>

<style scoped>
.steps-cont {
  margin-bottom: 50px;
}

.main-buy-cont {

  width: 100%;
}

.radios {
  display: flex;
  flex-direction: column;

}

.radios strong {
  font-size: 20px;
  margin: 10px;
}

.radio {

  margin: 10px;
}

.payment-method .n-input {
  margin-top: 5px;
}
</style>

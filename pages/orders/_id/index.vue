<template>
  <b-form class="d-flex flex-column" @submit.prevent="checkout">
    <div class="d-flex align-items-center justify-content-center mb-5">
      <div class="title">
        {{ $t('orders.order') }}
      </div>
      <StatusTag :status="order.status" class="ml-2" />
    </div>
    <div class="d-flex">
      <div class="form-section flex-fill">
        <div class="section-title">
          <div>
            {{ $t('orders.delivery.title') }}
          </div>
        </div>
        <b-collapse visible
          ><b-form-group
            :label="$t('orders.delivery.name')"
            label-for="input-name"
          >
            <b-form-input
              id="input-name"
              readonly
              :value="order.name"
              type="text"
              trim
              required
            ></b-form-input> </b-form-group
          ><b-form-group
            :label="$t('orders.delivery.phone')"
            label-for="input-phone"
          >
            <b-form-input
              id="input-phone"
              readonly
              :value="order.phone"
              type="number"
              trim
              required
            ></b-form-input> </b-form-group
          ><b-form-group
            :label="$t('orders.delivery.address')"
            label-for="input-address"
          >
            <b-form-input
              id="input-address"
              readonly
              :value="order.address"
              type="text"
              trim
              required
            ></b-form-input> </b-form-group
          ><b-form-group
            :label="$t('orders.delivery.note')"
            label-for="input-note"
          >
            <b-form-input
              id="input-note"
              readonly
              :value="order.note"
              type="text"
              trim
            ></b-form-input>
          </b-form-group>
        </b-collapse>
      </div>
      <div class="form-section flex-fill ml-4">
        <div class="section-title">
          <div>
            {{ $t('orders.payment.title') }}
          </div>
        </div>
        <b-collapse visible>
          <div class="d-flex flex-column">
            <div
              v-for="product in order.orderItems"
              :key="`${product.id}-${product.productSizeId}`"
              class="d-flex align-items-center justify-content-between mb-2"
            >
              <div class="d-flex">
                <img
                  :src="
                    product.productSize.product.images
                      ? product.productSize.product.images[0].url
                      : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
                  "
                  alt="eShopping image"
                  width="50"
                  height="50"
                  class="rounded object-fit-cover"
                />
                <div class="d-flex flex-column ml-2">
                  <div class="font-weight-bold">
                    {{ product.productSize.product.name }}
                    <b-badge>{{ product.quantity }}</b-badge>
                  </div>
                  <div>Size {{ product.productSize.size?.name }}</div>
                </div>
              </div>
              <div>
                {{ formatPrice(Number(product.price) * product.quantity) }}
              </div>
            </div>
            <div
              class="
                d-flex
                justify-content-between
                border-top border-black-50
                mt-4
                pt-4
              "
            >
              <div>Subtotal:</div>
              <div>{{ formatPrice(subTotal) }}</div>
            </div>
            <div class="d-flex justify-content-between mt-2">
              <div>Ship:</div>
              <div>{{ formatPrice(ship) }}</div>
            </div>
            <div class="d-flex text-large justify-content-between mt-2">
              <div>Total:</div>
              <div class="font-weight-bold">
                {{ formatPrice(Number(order.total)) }}
              </div>
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
    <div
      class="button-group d-flex align-items-center justify-content-center mt-5"
    >
      <b-button
        variant="outline-secondary"
        style="width: 150px"
        @click="$router.push(localePath({ name: 'orders' }))"
      >
        {{ $t('orders.button.backToOrder') }}
      </b-button>
      <b-button
        v-if="order.status === orderStatus.ON_PAYMENT"
        variant="outline-primary"
        type="submit"
        style="width: 150px"
      >
        {{ $t('orders.button.checkout') }}
      </b-button>
    </div>
  </b-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { Order } from '~/types/Order';
import StatusTag from '~/components/common/StatusTag.vue';
import formatPrice from '~/utils/formatPrice';
import orderStatus from '~/constants/orderStatus';

export default Vue.extend({
  name: 'Order',

  components: {
    StatusTag,
  },

  middleware: 'auth',

  async asyncData(ctx: Context) {
    const { id } = ctx.params;

    try {
      const { data: order } = await ctx.$services.orders.show(id);
      return { order };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { order: null };
    }
  },

  data() {
    return {
      order: {} as Order,
      ship: 20000,
      orderStatus,
    };
  },

  computed: {
    subTotal(): number {
      if (!this.order.orderItems.length) return 0;
      return this.order.orderItems.reduce(
        (total, product) => total + Number(product.price) * product.quantity,
        0
      );
    },
  },

  methods: {
    formatPrice,

    checkout() {
      console.log('checkout', this.order);
    },
  },
});
</script>

<style lang="scss" scoped>
.form-section {
  background-color: white;
  border-radius: 10px;
  box-shadow: $box-shadow-normal;
}

.button-group {
  gap: 1.5rem;
}
</style>

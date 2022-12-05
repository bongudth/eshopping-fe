<template>
  <b-sidebar
    :id="`order-dialog-${order.id}`"
    :visible="visible"
    :title="`Order #${order.id}`"
    width="30%"
    right
    backdrop
    shadow
    @hidden="$emit('close')"
  >
    <div class="d-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center">
        <div class="font-weight-bold">
          {{ $t('adminOrders.table.status') }}:
        </div>
        <StatusTag :status="order?.status" class="ml-2" />
      </div>
      <div>{{ formatDateTime(order.updatedAt) }}</div>
    </div>
    <div class="form-section p-0 mt-4 border-0">
      <div
        v-b-toggle.order-summary
        class="section-title background-pink rounded p-2"
      >
        <div>
          {{ $t('adminOrders.dialog.orderSummary') }}
        </div>
        <IconUp class="section-icon" />
      </div>
      <b-collapse id="order-summary" visible class="mt-0">
        <div class="d-flex flex-column">
          <div
            v-for="product in order.orderItems"
            :key="`${product.id}-${product.productSize.id}`"
            class="d-flex align-items-end justify-content-between mb-2"
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
    <div class="form-section p-0 mt-4 border-0">
      <div
        v-b-toggle.customer
        class="section-title background-pink rounded p-2"
      >
        <div>
          {{ $t('adminOrders.dialog.customer') }}
        </div>
        <IconUp class="section-icon" />
      </div>
      <b-collapse id="customer" visible class="mt-0">
        <div class="d-flex align-items-center">
          <img
            :src="
              order.user?.avatarUrl !== null
                ? order.user?.avatarUrl
                : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
            "
            alt="eShopping image"
            width="42"
            height="42"
            class="rounded object-fit-cover"
          />
          <div class="d-flex flex-column align-items-start ml-3">
            <div class="font-weight-bold">
              {{ order.name }}
            </div>
            <div class="text-small">{{ order.user?.email }}</div>
          </div>
        </div>
      </b-collapse>
    </div>
    <div class="form-section p-0 mt-4 border-0">
      <div
        v-b-toggle.delivery-info
        class="section-title background-pink rounded p-2"
      >
        <div>
          {{ $t('adminOrders.dialog.deliveryInfo') }}
        </div>
        <IconUp class="section-icon" />
      </div>
      <b-collapse id="delivery-info" visible class="mt-0">
        <div class="d-flex align-items-center">
          <div class="font-weight-bold">
            {{ $t('adminOrders.dialog.phone') }}:
          </div>
          <div class="ml-2">{{ order?.phone }}</div>
        </div>
        <div class="d-flex align-items-center mt-2">
          <div class="font-weight-bold">
            {{ $t('adminOrders.dialog.address') }}:
          </div>
          <div class="ml-2">{{ order?.address }}</div>
        </div>
        <div v-if="order.note" class="d-flex align-items-center mt-2">
          <div class="font-weight-bold">
            {{ $t('adminOrders.dialog.note') }}:
          </div>
          <div class="ml-2">{{ order?.note }}</div>
        </div>
      </b-collapse>
    </div>
    <template #footer>
      <div
        v-if="getOrderAction(order.status)[0].text !== ''"
        class="d-flex p-4"
        style="gap: 1rem"
      >
        <b-button
          v-for="action in getOrderAction(order.status)"
          :key="action.text"
          :variant="action.variant"
          class="flex-fill d-flex align-items-center justify-content-center"
          @click="$emit('change-status', order.id, action.status)"
        >
          {{ $t(`adminOrders.table.mark.${action.text}`) }}
        </b-button>
      </div>
    </template>
  </b-sidebar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Order } from '~/types/Order';
import StatusTag from '~/components/common/StatusTag.vue';
import IconUp from '~/components/icons/IconUp.vue';
import formatDateTime from '~/utils/formatDateTime';
import formatPrice from '~/utils/formatPrice';
import getOrderAction from '~/utils/getOrderAction';

export default Vue.extend({
  name: 'OrderDialog',

  components: {
    StatusTag,
    IconUp,
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Object as PropType<Order>,
      required: true,
    },
  },

  data() {
    return {
      ship: 20000,
    };
  },

  computed: {
    subTotal(): number {
      if (!this.order.orderItems) return 0;
      return this.order.orderItems.reduce(
        (total, product) => total + Number(product.price) * product.quantity,
        0
      );
    },
  },

  methods: {
    formatDateTime,
    formatPrice,
    getOrderAction,
  },
});
</script>

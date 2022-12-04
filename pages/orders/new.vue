<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="validator">
    <b-form
      class="d-flex flex-column"
      @submit.prevent="handleSubmit(postOrder)"
    >
      <div class="title text-center mb-5">
        {{ $t('orders.order') }}
      </div>
      <div class="d-flex">
        <div class="form-section flex-fill">
          <div class="section-title">
            <div>
              {{ $t('orders.delivery.title') }}
            </div>
          </div>
          <b-collapse visible>
            <ValidationProvider
              v-slot="{ validated, passed, errors }"
              vid="form.name"
              rules="required"
              :name="$t('orders.delivery.name')"
              ><b-form-group
                :label="$t('orders.delivery.name')"
                :invalid-feedback="errors[0]"
                label-for="input-name"
              >
                <b-form-input
                  id="input-name"
                  v-model="form.name"
                  type="text"
                  :state="validated ? passed : null"
                  :placeholder="$t('orders.delivery.enterYourName')"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ validated, passed, errors }"
              vid="form.phone"
              rules="required|length:10|numeric"
              :name="$t('orders.delivery.phone')"
              ><b-form-group
                :label="$t('orders.delivery.phone')"
                :invalid-feedback="errors[0]"
                label-for="input-phone"
              >
                <b-form-input
                  id="input-phone"
                  v-model="form.phone"
                  type="number"
                  :state="validated ? passed : null"
                  :placeholder="$t('orders.delivery.enterYourPhone')"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ validated, passed, errors }"
              vid="form.address"
              rules="required"
              :name="$t('orders.delivery.address')"
              ><b-form-group
                :label="$t('orders.delivery.address')"
                :invalid-feedback="errors[0]"
                label-for="input-address"
              >
                <b-form-input
                  id="input-address"
                  v-model="form.address"
                  type="text"
                  :state="validated ? passed : null"
                  :placeholder="$t('orders.delivery.enterYourAddress')"
                  trim
                  required
                ></b-form-input>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ validated, passed, errors }"
              vid="form.note"
              :name="$t('orders.delivery.note')"
              ><b-form-group
                :label="$t('orders.delivery.note')"
                :invalid-feedback="errors[0]"
                label-for="input-note"
              >
                <b-form-input
                  id="input-note"
                  v-model="form.note"
                  type="text"
                  :state="validated ? passed : null"
                  :placeholder="$t('orders.delivery.enterYourNote')"
                  trim
                ></b-form-input>
              </b-form-group>
            </ValidationProvider>
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
                v-for="product in orderProducts"
                :key="`${product.id}-${product.productSizeId}`"
                class="d-flex align-items-center justify-content-between mb-2"
              >
                <div class="d-flex">
                  <img
                    :src="
                      product.imageUrl
                        ? product.imageUrl
                        : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
                    "
                    alt="eShopping image"
                    width="50"
                    height="50"
                    class="rounded object-fit-cover"
                  />
                  <div class="d-flex flex-column ml-2">
                    <div class="font-weight-bold">
                      {{ product.name }}
                    </div>
                    <div>Size {{ product.productSizeName }}</div>
                  </div>
                </div>
                <b-form-spinbutton
                  id="quantity"
                  v-model="product.quantity"
                  size="sm"
                  min="0"
                  inline
                  @change="
                    updateQuantity(product.productSizeId, product.quantity)
                  "
                ></b-form-spinbutton>
                <div>{{ formatPrice(product.price * product.quantity) }}</div>
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
                <div class="font-weight-bold">{{ formatPrice(total) }}</div>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
      <div
        class="
          button-group
          d-flex
          align-items-center
          justify-content-center
          mt-5
        "
      >
        <b-button
          variant="outline-secondary"
          @click="$router.push(localePath({ name: 'cart' }))"
        >
          {{ $t('orders.button.backToCart') }}
        </b-button>
        <b-button variant="outline-primary" type="submit" :disabled="invalid">
          {{ $t('orders.button.placeOrder') }}
        </b-button>
      </div>
    </b-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import { PostOrder } from '~/types/Order';
import { CartProduct } from '~/types/Product';
import formatPrice from '~/utils/formatPrice';

export default Vue.extend({
  name: 'NewOrder',

  middleware: 'auth',

  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        note: '',
        items: [],
      } as PostOrder,
      orderProducts: [] as CartProduct[],
      ship: 20000,
    };
  },

  computed: {
    subTotal(): number {
      if (!this.orderProducts.length) return 0;
      return this.orderProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },

    total(): number {
      return this.subTotal + this.ship;
    },
  },

  created() {
    this.orderProducts = this.loadOrderProducts();
    this.form.items = this.orderProducts.map((product) => ({
      quantity: product.quantity,
      productSizeId: product.productSizeId,
    }));
  },

  methods: {
    formatPrice,

    loadQueryProductSizeIds() {
      const { query } = this.$route;
      return query.productSizeId as string[];
    },

    loadCartProducts() {
      return this.$cookies.get('cart') || [];
    },

    loadOrderProducts() {
      const queryProductSizeIds = this.loadQueryProductSizeIds();
      const cartProducts = this.loadCartProducts();
      return cartProducts.filter((cartProduct: CartProduct) =>
        queryProductSizeIds.includes(cartProduct.productSizeId.toString())
      );
    },

    updateQuantity(productSizeId: number, quantity: number) {
      const index = this.orderProducts.findIndex(
        (product) => product.productSizeId === productSizeId
      );
      this.orderProducts[index].quantity = quantity;
      this.form.items[index].quantity = quantity;
    },

    removeOrderProductsFromCart() {
      const cartProducts = this.loadCartProducts();
      const newCartProducts = cartProducts.filter(
        (cartProduct: CartProduct) =>
          !this.orderProducts.some(
            (orderProduct) =>
              orderProduct.productSizeId === cartProduct.productSizeId
          )
      );
      this.$cookies.set('cart', newCartProducts);
    },

    postOrder() {
      this.$axios
        .$post('/orders', this.form)
        .then((res) => {
          this.removeOrderProductsFromCart();
          this.$bvToast.toast(this.$t('orders.toast.success') as string, {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          });
          window.location.href = res.data.payUrl;
        })
        .catch((error) => {
          if (error.statusCode === 400) {
            const {
              id,
              quantity,
              product: { name },
            } = error.message.detail;
            const sizeName = this.orderProducts.find(
              (product) => product.productSizeId === id
            )?.productSizeName;
            this.$bvToast.toast(
              this.$t('orders.toast.errorQuantity', {
                name,
                sizeName,
                quantity,
              }) as string,
              {
                title: this.$t('toastTitle.error') as string,
                variant: 'danger',
              }
            );
          } else {
            this.$bvToast.toast(this.$t('orders.toast.error') as string, {
              title: this.$t('toastTitle.error') as string,
              variant: 'danger',
            });
          }
        });
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

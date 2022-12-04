<template>
  <div class="d-flex flex-column align-items-center">
    <div class="title mb-5">{{ $t('cart.cart') }}</div>
    <div
      v-if="cartProducts.length"
      class="cart__container w-100 d-flex justify-content-center"
    >
      <div class="cart__table background-white shadow">
        <b-table
          selectable
          select-mode="multi"
          hover
          borderless
          responsive
          thead-class="background-pink"
          :fields="fields"
          :items="cartProducts"
          @row-selected="selectProducts"
        >
          <template #head(select)="{ selectAllRows, clearSelected }">
            <template v-if="selectedProducts.length">
              <IconCheck @click.native="clearSelected" />
            </template>
            <template v-else>
              <IconNoCheck @click.native="selectAllRows" />
            </template>
          </template>

          <template #cell(select)="{ rowSelected }">
            <template v-if="rowSelected">
              <IconCheck />
            </template>
            <template v-else>
              <IconNoCheck />
            </template>
          </template>

          <template #cell(product)="data">
            <div class="d-flex align-items-center">
              <img
                :src="
                  data.item.imageUrl
                    ? data.item.imageUrl
                    : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg'
                "
                alt="eShopping image"
                width="100"
                height="100"
                class="rounded object-fit-cover"
              />
              <div class="d-flex flex-column align-items-start ml-3">
                <div
                  class="d-inline-block text-truncate font-weight-bold"
                  style="max-width: 150px"
                >
                  {{ data.item.name }}
                </div>
                <div class="mt-1">{{ formatPrice(data.item.price) }}</div>
                <div class="border border-secondary rounded-pill px-2 mt-1">
                  {{ data.item.productSizeName }}
                </div>
              </div>
            </div>
          </template>

          <template #cell(quantity)="data">
            <b-form-spinbutton
              id="input-quantity"
              v-model="data.value"
              size="sm"
              min="1"
              inline
              @change="updateQuantity(data.item, data.value)"
            ></b-form-spinbutton>
          </template>

          <template #cell(total)="data">
            <div>{{ formatPrice(data.item.price * data.item.quantity) }}</div>
          </template>

          <template #cell(delete)="data">
            <IconTrash @click.native="deleteProduct(data.item.productSizeId)" />
          </template>
        </b-table>
      </div>
      <div
        class="
          cart__summary
          background-white
          d-flex
          align-items-center
          justify-content-around
          shadow
        "
      >
        <div class="d-flex align-items-center">
          <div>{{ $t('cart.total') }}:</div>
          <div class="text-large font-weight-bold ml-2">
            {{ formatPrice(totalPrice) }}
          </div>
        </div>
        <BuyNowButton
          :disabled="!selectedProducts.length"
          @click.native="makeOrder"
        />
        <Modal
          id="modal__go-to-sign-in"
          :title="$t('products.modal.signIn.title')"
          :message="$t('products.modal.signIn.message')"
          :actions="actionsGoToSignIn"
        />
      </div>
    </div>
    <div v-else class="d-flex flex-column align-items-center mt-5">
      <NoData style="width: 400px" />
      <div class="text-super font-weight-bold mt-3">
        {{ $t('cart.empty.title') }}
      </div>
      <div class="mt-2">{{ $t('cart.empty.description') }}</div>
      <b-button
        variant="primary"
        class="mt-4"
        style="min-width: fit-content"
        @click="$router.push(localePath({ name: 'products' }))"
      >
        {{ $t('cart.empty.goToShop') }}
      </b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconCheck from '~/components/icons/IconCheck.vue';
import IconNoCheck from '~/components/icons/IconNoCheck.vue';
import IconTrash from '~/components/icons/IconTrash.vue';
import BuyNowButton from '~/components/common/BuyNowButton.vue';
import NoData from '~/components/icons/NoData.vue';
import Modal from '~/components/common/Modal.vue';
import formatPrice from '~/utils/formatPrice';
import { CartProduct } from '~/types/Product';

type Dictionary<T> = { [key: string]: T };

export default Vue.extend({
  name: 'Cart',

  components: {
    IconCheck,
    IconNoCheck,
    IconTrash,
    BuyNowButton,
    NoData,
    Modal,
  },

  data() {
    return {
      fields: [
        {
          key: 'select',
          class: 'min-w-100 text-center',
        },
        {
          key: 'product',
          label: this.$t('cart.product'),
          class: 'min-w-300',
        },
        { key: 'quantity', label: this.$t('cart.quantity'), sortable: true },
        { key: 'total', label: this.$t('cart.total') },
        {
          key: 'delete',
          label: '',
          class: 'min-w-100 text-center',
        },
      ],
      cartProducts: [] as CartProduct[],
      selectedProducts: [] as CartProduct[],
      actionsGoToSignIn: [
        {
          icon: () => import('~/components/icons/IconSignIn.vue'),
          text: this.$t('products.modal.signIn.goToSignIn'),
          redirect: 'signin',
        },
      ],
    };
  },

  computed: {
    totalPrice(): number {
      if (this.selectedProducts.length) {
        return this.selectedProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
      }
      return this.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },

  created() {
    this.loadCartProducts();
  },

  methods: {
    formatPrice,

    loadCartProducts(): void {
      this.cartProducts = this.$cookies.get('cart') || [];
    },

    updateQuantity(cartProduct: CartProduct, quantity: number) {
      try {
        const cookieCart = this.$cookies.get('cart') || [];
        const existingProduct = cookieCart.find(
          (product: CartProduct) =>
            product.productSizeId === cartProduct.productSizeId
        );
        if (existingProduct) {
          existingProduct.quantity = quantity;
        }
        this.$cookies.set('cart', cookieCart);
        this.loadCartProducts();

        this.$root.$bvToast.toast(
          this.$t('cart.toast.update.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$root.$bvToast.toast(
          this.$t('cart.toast.update.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          }
        );
      }
    },

    deleteProduct(productSizeId: CartProduct['productSizeId']) {
      try {
        const cookieCart = this.$cookies.get('cart') || [];
        const newCookieCart = cookieCart.filter(
          (product: CartProduct) => product.productSizeId !== productSizeId
        );
        this.$cookies.set('cart', newCookieCart);

        this.loadCartProducts();

        this.$root.$bvToast.toast(
          this.$t('cart.toast.delete.success') as string,
          {
            title: this.$t('toastTitle.success') as string,
            variant: 'success',
          }
        );
      } catch (error) {
        this.$root.$bvToast.toast(
          this.$t('cart.toast.delete.error') as string,
          {
            title: this.$t('toastTitle.error') as string,
            variant: 'danger',
          }
        );
      }
    },

    selectProducts(products: CartProduct[]) {
      this.selectedProducts = products;
    },

    makeOrder() {
      if (this.$auth.loggedIn && this.selectedProducts.length) {
        const queryParams = this.selectedProducts.reduce(
          (query, product) => {
            query.productSizeId.push(product.productSizeId.toString());
            return query;
          },
          { productSizeId: [] } as Dictionary<string[]>
        );
        this.$router.push(
          this.localePath({ name: 'orders-new', query: queryParams })
        );
      } else {
        this.$bvModal.show('modal__go-to-sign-in');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.cart {
  &__container {
    flex-direction: column;
    gap: 50px;

    @include media-breakpoint-up(lg) {
      align-items: flex-start;
      flex-direction: row;
    }
  }

  &__table {
    border-radius: 50px;
    padding: 20px;

    @include media-breakpoint-up(lg) {
      padding: 30px;
    }

    @include media-breakpoint-up(xl) {
      padding: 50px;
    }
  }

  &__summary {
    width: 100%;
    flex-direction: column;
    gap: 20px;
    border-radius: 50px;
    padding: 20px;

    @include media-breakpoint-up(sm) {
      flex-direction: row;
    }

    @include media-breakpoint-up(lg) {
      position: sticky;
      top: $header-height;
      width: fit-content;
      flex-direction: column;
      padding: 30px;
    }

    @include media-breakpoint-up(xl) {
      padding: 50px;
    }
  }
}
</style>

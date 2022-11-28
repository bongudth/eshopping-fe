<template>
  <div class="product-detail__container d-flex flex-column">
    <div class="product-detail__full-info w-100 d-flex">
      <div
        v-if="images[0]"
        class="product-detail__thumbnails d-flex flex-column"
      >
        <VueSlickCarousel
          ref="image_preview"
          fade
          focus-on-select
          :as-nav-for="image_gallery"
          class="image-preview"
        >
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            alt="eShopping image"
          />
        </VueSlickCarousel>
        <VueSlickCarousel
          ref="image_gallery"
          focus-on-select
          :as-nav-for="image_preview"
          :slides-to-show="3"
          class="image-gallery"
        >
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            alt="eShopping image"
          />
        </VueSlickCarousel>
      </div>
      <img
        v-else
        src="https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg"
        alt="eShopping image"
        class="image-default"
      />
      <div
        :class="[
          'product-detail__info background-white d-flex flex-column shadow',
          images.length ?? 'with-image-default',
        ]"
      >
        <div class="d-flex align-items-center justify-content-between">
          <div class="text-large text-black-50 text-uppercase">
            {{ product.category.name }}
          </div>
          <DiscountTag
            v-if="product.discount.length"
            class="ml-4"
            :percent="product.discount[0].percent"
          />
        </div>
        <div class="text-super">{{ product.name }}</div>
        <div class="d-flex align-items-center">
          <b-form-rating
            v-model="rating"
            variant="warning"
            readonly
            inline
            no-border
            class="h-auto p-0"
          ></b-form-rating>
          <div class="ml-2 pr-4 border-1 border-right">
            {{ rating }} {{ $t('products.detail.review') }}
          </div>
          <div class="ml-4">
            {{ product.stock }} {{ $t('products.detail.stock') }}
          </div>
        </div>
        <div
          v-if="product.discount.length"
          class="d-flex align-items-center my-2"
        >
          <div class="text-large font-weight-bold">
            {{
              formatPrice(
                (product.price * (100 - product.discount[0].percent)) / 100
              )
            }}
          </div>
          <div class="text-black-50 text-line-through ml-2">
            {{ formatPrice(product.price) }}
          </div>
        </div>
        <div v-else class="text-large font-weight-bold my-2">
          {{ formatPrice(product.price) }}
        </div>
        <div class="d-flex align-items-center">
          <div>{{ $t('products.detail.size') }}:</div>
          <ProductSize
            v-for="productSize in product.productSizes"
            :key="productSize.id"
            :product-size="productSize"
            :selected-product-size-id="productSizeId"
            @change="changeSelectedProductSizeId"
          />
        </div>
        <div class="d-flex align-items-center">
          <div>{{ $t('products.detail.quantity') }}:</div>
          <b-form-spinbutton
            id="demo-sb"
            v-model="quantity"
            size="sm"
            min="1"
            :max="productSizeQuantity"
            inline
            class="ml-2"
          ></b-form-spinbutton>
        </div>
        <div class="d-flex align-items-center">
          <div class="info__title">{{ $t('products.detail.total') }}:</div>
          <div
            v-if="product.discount.length"
            class="text-super font-weight-bold ml-2"
          >
            {{
              formatPrice(
                ((product.price * (100 - product.discount[0].percent)) / 100) *
                  quantity
              )
            }}
          </div>
          <div
            v-if="product.discount.length"
            class="
              info__price--origin
              text-black-50 text-large text-line-through
              ml-2
            "
          >
            {{ formatPrice(product.price * quantity) }}
          </div>
          <div v-else class="text-super font-weight-bold ml-2">
            {{ formatPrice(product.price * quantity) }}
          </div>
        </div>
        <div v-auth:forbid.visible="['admin']">
          <div class="info__action d-flex">
            <CartAddButton :disabled="!isFullFill" @click.native="addToCart" />
            <BuyNowButton :disabled="!isFullFill" @click.native="makeOrder" />
          </div>
        </div>
      </div>
    </div>
    <div>{{ product.description }}</div>
    <Modal
      id="modal__go-to-sign-in"
      :title="$t('products.modal.signIn.title')"
      :message="$t('products.modal.signIn.message')"
      :actions="actionsGoToSignIn"
    />
    <Modal
      id="modal__go-to-cart"
      :title="$t('products.modal.cart.title')"
      :message="$t('products.modal.cart.message')"
      :actions="actionsGoToCart"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import ProductSize from '~/components/products/ProductSize.vue';
import DiscountTag from '~/components/common/DiscountTag.vue';
import CartAddButton from '~/components/common/CartAddButton.vue';
import BuyNowButton from '~/components/common/BuyNowButton.vue';
import Modal from '~/components/common/Modal.vue';
import { Product, CartProduct } from '~/types/Product';
import formatPrice from '~/utils/formatPrice';
import auth from '~/mixins/directives/auth';

export default Vue.extend({
  name: 'Product',

  directives: {
    auth,
  },

  components: {
    ProductSize,
    DiscountTag,
    CartAddButton,
    BuyNowButton,
    Modal,
  },

  auth: 'guest',

  async asyncData(ctx: Context) {
    const { slug } = ctx.params;
    try {
      const { data: product } = await ctx.$services.products.show(slug);
      const productSizeId = product.productSizes[0].id;
      return { product, productSizeId };
    } catch (error) {
      ctx.$sentry.captureException(error);
      return { product: null };
    }
  },

  data() {
    return {
      actionsGoToSignIn: [
        {
          icon: () => import('~/components/icons/IconSignIn.vue'),
          text: this.$t('products.modal.signIn.goToSignIn'),
          redirect: 'signin',
        },
      ],
      actionsGoToCart: [
        {
          icon: () => import('~/components/icons/IconShop.vue'),
          text: this.$t('products.modal.cart.continue'),
        },
        {
          icon: () => import('~/components/icons/IconCart.vue'),
          text: this.$t('products.modal.cart.goToCart'),
          redirect: 'cart',
        },
      ],
      image_gallery: undefined as unknown,
      image_preview: undefined as unknown,
      product: {} as Product,
      rating: 3.5,
      quantity: 1,
      productSizeId: null as unknown as number,
      isFullFill: true,
    };
  },

  computed: {
    productSizeName(): string {
      return (
        this.product.productSizes.find(
          (productSize) => productSize.id === this.productSizeId
        )?.size.name || ''
      );
    },

    productSizeQuantity(): number {
      return (
        this.product.productSizes.find(
          (productSize) => productSize.id === this.productSizeId
        )?.quantity || 0
      );
    },

    images(): string[] {
      return this.product.images.map((image) => image.url || '');
    },
  },

  watch: {
    productSizeId: {
      handler() {
        this.isFullFill = this.productSizeId !== null && this.quantity > 0;
      },
      immediate: true,
    },

    quantity: {
      handler() {
        this.isFullFill = this.productSizeId !== null && this.quantity > 0;
      },
      immediate: true,
    },
  },

  mounted() {
    this.image_gallery = this.$refs.image_gallery;
    this.image_preview = this.$refs.image_preview;
  },

  methods: {
    formatPrice,

    changeSelectedProductSizeId(id: number) {
      this.productSizeId = id;
    },

    addProductToCookieCart(cartProduct: CartProduct) {
      const cookieCart = this.$cookies.get('cart') || [];
      const existedProduct = cookieCart.find(
        (product: CartProduct) =>
          product.productSizeId === cartProduct.productSizeId
      );
      if (existedProduct) {
        existedProduct.quantity += cartProduct.quantity;
      } else {
        cookieCart.push(cartProduct);
      }
      this.$cookies.set('cart', cookieCart);
    },

    addToCart() {
      try {
        const cartProduct = {
          id: this.product.id,
          imageUrl: this.product.images.length
            ? this.product.images[0].url
            : '',
          name: this.product.name,
          price: this.product.discount.length
            ? (this.product.price * (100 - this.product.discount[0].percent)) /
              100
            : this.product.price,
          productSizeId: this.productSizeId,
          productSizeName: this.productSizeName,
          quantity: this.quantity,
        } as CartProduct;
        this.addProductToCookieCart(cartProduct);

        this.$root.$bvToast.toast(this.$t('products.cart.success') as string, {
          title: this.$t('toastTitle.success') as string,
          variant: 'success',
        });

        this.$bvModal.show('modal__go-to-cart');
      } catch (error) {
        this.$root.$bvToast.toast(this.$t('products.cart.error') as string, {
          title: this.$t('toastTitle.error') as string,
          variant: 'danger',
        });
      }
    },

    makeOrder() {
      if (this.$auth.loggedIn) {
        this.addToCart();
        this.$router.push(
          this.localePath({
            name: 'orders-new',
            query: { productSizeId: this.productSizeId.toString() },
          })
        );
      } else {
        this.$bvModal.show('modal__go-to-sign-in');
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.product-detail {
  &__container {
    gap: 50px;
  }

  &__full-info {
    flex-direction: column;
    align-items: center;

    @include media-breakpoint-up(lg) {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }

    .image-default {
      display: none;
      width: 300px;
      border-radius: 50px;
      box-shadow: $box-shadow-normal;

      @include media-breakpoint-up(lg) {
        display: block;
        width: 300px;
      }

      @include media-breakpoint-up(xl) {
        width: 500px;
      }
    }
  }

  &__thumbnails {
    width: 300px;
    gap: 20px;

    @include media-breakpoint-up(sm) {
      width: 400px;
    }

    @include media-breakpoint-up(md) {
      width: 500px;
    }

    @include media-breakpoint-up(lg) {
      width: 300px;
    }

    @include media-breakpoint-up(xl) {
      width: 500px;
    }

    img {
      object-fit: cover;
      border-radius: 50px;
      box-shadow: $box-shadow-normal;
    }

    .image {
      &-preview {
        img {
          width: 100%;
          height: 300px;
          cursor: pointer;

          @include media-breakpoint-up(sm) {
            height: 400px;
          }

          @include media-breakpoint-up(md) {
            height: 500px;
          }

          @include media-breakpoint-up(lg) {
            height: 300px;
          }

          @include media-breakpoint-up(xl) {
            height: 500px;
          }
        }
      }

      &-gallery {
        visibility: hidden;

        img {
          width: 147px !important;
          height: 147px;
          cursor: pointer;
        }

        @include media-breakpoint-up(md) {
          visibility: visible;
        }

        @include media-breakpoint-up(lg) {
          visibility: hidden;
        }

        @include media-breakpoint-up(xl) {
          visibility: visible;
        }
      }
    }
  }

  &__info {
    width: 100%;
    gap: 20px;
    border-radius: 50px;
    padding: 20px;
    margin-top: 50px - 147px;

    &.with-image-default {
      margin-top: 0;
    }

    @include media-breakpoint-up(md) {
      margin-top: 50px;
    }

    @include media-breakpoint-up(lg) {
      width: calc(100% - 300px - 100px);
      padding: 30px;
      margin-top: 0;
    }

    @include media-breakpoint-up(xl) {
      width: calc(100% - 500px - 100px);
      padding: 50px;
    }

    .info {
      &__action {
        gap: 20px;
      }
    }
  }
}
</style>

<template>
  <div
    class="
      product-item__container
      background-white
      d-flex
      flex-column
      align-items-center
      shadow
    "
  >
    <img
      :src="thumbnailUrl"
      alt="eShopping product"
      class="product-item__image w-100"
    />
    <div class="product-item__name text-large text-center">
      {{ product.name }}
    </div>
    <div v-if="!product.discount.length" class="text-large font-weight-bold">
      {{ formatPrice(product.price) }}
    </div>
    <div v-else class="product-item__price d-flex">
      <div class="text-large font-weight-bold">
        {{
          formatPrice(
            (product.price * (100 - product.discount[0].percent)) / 100
          )
        }}
      </div>
      <div class="price__old text-secondary text-line-through">
        {{ formatPrice(product.price) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Product } from '~/types/Product';
import formatPrice from '~/utils/formatPrice';

export default Vue.extend({
  name: 'ProductItem',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  computed: {
    thumbnailUrl(): string {
      return this.product.images.length
        ? (this.product.images[0].url as string)
        : 'https://www.democraciacristajovem.org.br/wp-content/themes/dc_jovem2022/assets/images/default.jpg';
    },
  },

  methods: {
    formatPrice,
  },
});
</script>

<style lang="scss" scoped>
.product-item__container {
  width: 170px;
  height: 280px;
  gap: 10px;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  @include media-breakpoint-up(sm) {
    width: 250px;
    height: 350px;
  }

  @include media-breakpoint-up(md) {
    width: 300px;
    height: 400px;
  }

  &:hover {
    color: $primary;
    box-shadow: $box-shadow-hover;

    .product-item__image {
      transform: scale(1.1);
      box-shadow: $box-shadow-hover;
    }
  }

  .product-item__image {
    height: 150px;
    object-fit: cover;
    border-radius: 40px;
    transition: all 0.3s ease-in-out;

    @include media-breakpoint-up(sm) {
      height: 230px;
    }

    @include media-breakpoint-up(md) {
      height: 280px;
    }
  }

  .product-item__name {
    margin-top: 10px;

    @include truncate-multiline(1);
  }

  .product-item__price {
    flex-direction: column;
    align-items: center;

    @include media-breakpoint-up(sm) {
      flex-direction: row;
      align-items: flex-end;
    }

    .price__old {
      @include media-breakpoint-up(sm) {
        margin-left: 10px;
      }
    }
  }
}
</style>

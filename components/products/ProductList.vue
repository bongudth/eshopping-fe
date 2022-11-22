<template>
  <div class="product-list__container d-flex flex-wrap">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click.native="
        $router.push(
          localePath({
            name: 'products-slug',
            params: { slug: product.slug },
          })
        )
      "
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import ProductItem from '~/components/products/ProductItem.vue';
import { Product } from '~/types/Product';

export default Vue.extend({
  name: 'ProductList',

  components: { ProductItem },

  props: {
    products: {
      type: Array as PropType<Product[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.product-list__container {
  width: 350px;
  gap: 10px;

  @include media-breakpoint-up(sm) {
    width: 520px;
    gap: 20px;
  }

  @include media-breakpoint-up(md) {
    width: 630px;
    gap: 30px;
  }

  @include media-breakpoint-up(xl) {
    width: 1000px;
    gap: 50px;
  }
}
</style>

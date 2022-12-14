<template>
  <nav>
    <b-nav vertical>
      <b-button
        v-b-toggle.collapse-product-management
        variant="outline-primary"
        class="mt-2"
      >
        {{ $t('sidebar.product.title') }}
      </b-button>
      <b-collapse id="collapse-product-management" visible>
        <nuxt-link :to="localePath({ name: 'admin' })">
          <IconProduct />
          {{ $t('sidebar.product.product') }}
        </nuxt-link>
        <nuxt-link :to="localePath({ name: 'admin-categories' })">
          <IconCategory />
          {{ $t('sidebar.product.category') }}
        </nuxt-link>
        <nuxt-link :to="localePath({ name: 'admin-sizes' })">
          <IconSize />
          {{ $t('sidebar.product.size') }}
        </nuxt-link>
        <nuxt-link :to="localePath({ name: 'admin-discounts' })">
          <IconDiscount />
          {{ $t('sidebar.product.discount') }}
        </nuxt-link>
        <nuxt-link :to="localePath({ name: 'admin-receipts' })">
          <IconImport />
          {{ $t('sidebar.product.receipt') }}
        </nuxt-link>
      </b-collapse>

      <b-button
        v-b-toggle.collapse-order-management
        variant="outline-primary"
        class="mt-2"
      >
        {{ $t('sidebar.order.title') }}
      </b-button>
      <b-collapse id="collapse-order-management" visible>
        <nuxt-link :to="localePath({ name: 'admin-orders' })">
          <IconPackage />
          {{ $t('sidebar.order.all') }}
        </nuxt-link>
        <nuxt-link
          :to="
            localePath({
              name: 'admin-orders',
              query: { status: 'on_payment' },
            })
          "
        >
          <IconOrderPending />
          {{ $t('sidebar.order.on_payment') }}
        </nuxt-link>
        <nuxt-link
          :to="
            localePath({
              name: 'admin-orders',
              query: { status: 'on_preparing' },
            })
          "
        >
          <IconOrderSuccess />
          {{ $t('sidebar.order.on_preparing') }}
        </nuxt-link>
        <nuxt-link
          :to="
            localePath({
              name: 'admin-orders',
              query: { status: 'on_delivery' },
            })
          "
        >
          <IconTruck />
          {{ $t('sidebar.order.on_delivery') }}
        </nuxt-link>
        <nuxt-link
          :to="
            localePath({
              name: 'admin-orders',
              query: { status: 'cancelled' },
            })
          "
        >
          <IconCancel />
          {{ $t('sidebar.order.cancelled') }}
        </nuxt-link>
      </b-collapse>
    </b-nav>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import IconProduct from '~/components/icons/IconProduct.vue';
import IconCategory from '~/components/icons/IconCategory.vue';
import IconSize from '~/components/icons/IconSize.vue';
import IconDiscount from '~/components/icons/IconDiscount.vue';
import IconImport from '~/components/icons/IconImport.vue';
import IconPackage from '~/components/icons/IconPackage.vue';
import IconOrderPending from '~/components/icons/IconOrderPending.vue';
import IconTruck from '~/components/icons/IconTruck.vue';
import IconOrderSuccess from '~/components/icons/IconOrderSuccess.vue';
import IconCancel from '~/components/icons/IconCancel.vue';
import IconDashboard from '~/components/icons/IconDashboard.vue';
import IconSale from '~/components/icons/IconSale.vue';
import IconRevenue from '~/components/icons/IconRevenue.vue';
import IconRating from '~/components/icons/IconRating.vue';

export default Vue.extend({
  name: 'NavLinks',

  components: {
    IconProduct,
    IconCategory,
    IconSize,
    IconDiscount,
    IconImport,
    IconPackage,
    IconOrderPending,
    IconTruck,
    IconOrderSuccess,
    IconCancel,
    IconDashboard,
    IconSale,
    IconRevenue,
    IconRating,
  },
});
</script>

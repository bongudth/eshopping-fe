<template>
  <div class="new-arrivals-section d-flex flex-column align-items-center">
    <div
      class="
        image__list
        d-flex
        flex-wrap
        align-items-end
        justify-content-center
      "
    >
      <div class="title">{{ $t('home.newArrivals') }}.</div>
      <img
        class="image__item"
        src="https://i.pinimg.com/564x/32/0b/cd/320bcd3101152c7880e8ca5f83cefcf9.jpg"
      />
      <img
        class="image__item"
        src="https://i.pinimg.com/564x/01/08/13/010813db391083c00e732fc14cb1d09e.jpg"
      />
      <img
        class="image__item"
        src="https://i.pinimg.com/564x/3e/42/ed/3e42ed507749080874aaad5eb04ea2d5.jpg"
      />
      <img
        class="image__item"
        src="https://i.pinimg.com/736x/be/33/25/be33251f9522d73faa33797ad799f455.jpg"
      />
      <img
        class="image__item"
        src="https://i.pinimg.com/564x/9a/89/e7/9a89e7f1328f657b56ea42db25264a6b.jpg"
      />
    </div>
    <b-button
      pill
      variant="outline-primary"
      class="d-flex align-items-center"
      @click="$router.push(localePath({ name: 'products' }))"
    >
      <IconSeeMore class="mr-2" />
      {{ $t('home.seeMore') }}
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconSeeMore from '~/components/icons/IconSeeMore.vue';

export default Vue.extend({
  name: 'NewArrivals',

  components: { IconSeeMore },
});
</script>

<style lang="scss" scoped>
.new-arrivals-section {
  gap: 50px;
  margin-top: 100px;

  @include media-breakpoint-up(sm) {
    margin-top: 200px;
  }

  .image__list {
    width: 310px;
    gap: 10px;

    @include media-breakpoint-up(sm) {
      width: 440px;
      gap: 20px;
    }

    @include media-breakpoint-up(md) {
      width: 530px;
      gap: 30px;
    }

    @include media-breakpoint-up(xl) {
      width: 1000px;
      gap: 50px;
    }

    .title {
      width: 150px;

      @include media-breakpoint-up(sm) {
        width: 200px;
      }

      @include media-breakpoint-up(md) {
        width: 250px;
      }

      @include media-breakpoint-up(xl) {
        width: 300px;
      }
    }

    .image__item {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50px;
      box-shadow: $box-shadow-normal;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      @include media-breakpoint-up(sm) {
        width: 200px;
        height: 200px;
      }

      @include media-breakpoint-up(md) {
        width: 250px;
        height: 250px;
      }

      @include media-breakpoint-up(xl) {
        width: 300px;
        height: 300px;
      }

      &:hover {
        transform: scale(1.1);
        box-shadow: $box-shadow-hover;
      }
    }
  }
}
</style>

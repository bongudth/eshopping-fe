<template>
  <div
    class="
      introduce-section
      background-white
      position-relative
      d-flex
      align-items-center
      shadow
    "
  >
    <div class="introduce-section__content w-100 d-flex flex-column">
      <div class="title mb-2">
        {{ $t('home.fashionUpYouLook') }}
      </div>
      <div class="mb-4">{{ $t('home.makeYourStyleMoreUnique') }}</div>
      <b-button
        pill
        variant="outline-primary"
        class="d-flex align-items-center"
      >
        <IconDownLoad class="mr-2" />
        {{ $t('home.downloadAppForMobile') }}
      </b-button>
    </div>
    <b-carousel
      v-model="slide"
      fade
      :interval="3000"
      class="introduce-section__image position-absolute"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        img-src="https://global-uploads.webflow.com/5fce68a0d8f769e24b593987/60566dbfe7d26514dc3e64ef_GenZ%20Blob.png"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="https://global-uploads.webflow.com/5fce68a0d8f769e24b593987/605672772e8de83e673e2c0e_Granny%20Blob.png"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IconDownLoad from '~/components/icons/IconDownLoad.vue';

export default Vue.extend({
  name: 'Introduce',

  components: { IconDownLoad },

  data() {
    return {
      slide: 0,
      sliding: false,
    };
  },

  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.introduce-section {
  border-radius: 50px;
  padding: 20px;
  margin-top: 150px;

  @include media-breakpoint-up(sm) {
    padding: 50px;
  }

  .introduce-section__content {
    align-items: center;
    margin-top: 150px;

    @include media-breakpoint-up(sm) {
      margin-top: 200px;
    }

    @include media-breakpoint-up(xl) {
      align-items: flex-start;
      margin-top: 0;
    }
  }

  .introduce-section__image {
    width: 300px;
    height: 300px;
    top: -150px;
    left: 50%;
    transform: translateX(-50%);

    @include media-breakpoint-up(sm) {
      width: 400px;
      height: 400px;
    }

    @include media-breakpoint-up(xl) {
      right: 50px;
      bottom: 50px;
      top: unset;
      left: unset;
      transform: unset;
    }
  }
}
</style>

<template>
  <div
    :class="{
      'layout-default': !isMobile
    }"
  >
    <div
      :class="{
        'layout-default__container': !isMobile,
        'layout-default__container_mobile': isMobile
      }"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isMobile } from '~/modules/tools'

export default Vue.extend({
  name: 'LayoutDefault',
  computed: {
    isMobile
  }
})
</script>

<style lang="scss">
@import "src/assets/variables";

.layout-default {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: $background;
}

.layout-default__container {
  display: flex;
  flex-direction: column;
  width: $pc-layout-container-width;
  min-height: $pc-layout-container-min-height;
  background: $white;
  box-shadow: $container-outer-box-shadow;
  border-radius: 16px;
  border: $container-border;
}

.layout-default__container_mobile {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
}
</style>

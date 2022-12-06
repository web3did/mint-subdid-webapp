<template>
  <div
    class="guide-card__container"
    :style="{ backgroundColor: backgroundColor }"
  >
    <span class="guide-card__icon">
      <Iconfont
        :name="iconName"
        size="32"
      />
    </span>
    <div class="guide-card__text">
      <div class="guide-card__title">
        {{ title }}
      </div>
      <div
        v-if="description"
        class="guide-card__description"
      >
        {{ description }}
      </div>
    </div>
    <span class="guide-card__arrow">
      <Iconfont
        name="arrow-right"
        color="#31333E"
        size="14"
      />
    </span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Iconfont from '~/components/icon/Iconfont.vue'

export default defineComponent({
  name: 'GuideCard',
  components: {
    Iconfont
  },
  props: {
    title: String,
    description: String,
    backgroundColor: String,
    iconName: String
  },
  setup () {
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.guide-card__container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 311px;
  margin: 0 auto 12px auto;
  border: 1px solid rgba(98, 126, 234, 0.1);
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

.guide-card__icon {
  width: 32px;
  height: 32px;
  margin-left: 20px;
  margin-right: 12px;
}

.guide-card__text {
  flex: 1;
  text-align: left;
  padding: 20px 0;
}

.guide-card__title {
  font-size: $font-size-16;
  font-weight: bold;
  color: $primary-font-color;
}

.guide-card__description {
  margin-top: 4px;
  font-size: $font-size-12;
  color: $assist-font-color;
}

.guide-card__arrow {
  padding-right: 30px;
}
</style>

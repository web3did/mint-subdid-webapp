<template>
  <span
    class="lang-switcher"
    :style="{ 'color': dark ? '#FFFFFF' : '#121314' }"
    v-click-outside="onClickOutside"
  >
    <span
      v-for="option in LanguageOptions"
      v-show="computedLanguage.value === option.value"
      :key="option.value"
      class="lang-switcher__item"
      :class="{ '_block': block }"
      @click="onShowOptions"
    >
      <span>
        <Iconfont
          class="lang-switcher__language__icon"
          name="language"
          size="19"
          :color="dark ? '#FFFFFF' : '#121314'"
        />
        {{ option.symbol }}
      </span>
      <Iconfont
        class="lang-switcher__language__arrow-down"
        name="arrow-down"
        size="12"
        :color="dark ? '#FFFFFF' : '#5F6570'"
      />
    </span>
    <ul
      v-show="optionsShowing"
      class="lang-switcher__list"
    >
<!--      <li class="lang-switcher__list__label">{{ $tt('Language') }}</li>-->
      <li
        v-for="option in LanguageOptions"
        :key="option.value"
        class="lang-switcher__list__item"
        @click="switchLanguage(option)"
      >
        <Iconfont
          v-if="option.icon"
          class="lang-switcher__list__item__icon"
          :name="option.icon"
          size="20"
          color="#B0B8BF"
        />
        {{ option.text }}
      </li>
    </ul>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// @ts-ignore
import vClickOutside from 'v-click-outside'
import { ILanguageOption, LanguageOptions } from '~/constant/language'
import { COMMON_KEYS } from '~/store/common'
import Iconfont from '~/components/icon/Iconfont.vue'

export default Vue.extend({
  name: 'LangSwitcher',
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    Iconfont
  },
  props: {
    dark: {
      type: Boolean,
      required: false
    },
    block: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      LanguageOptions,
      optionsShowing: false
    }
  },
  computed: {
    ...mapGetters({
      computedLanguage: COMMON_KEYS.computedLanguage
    })
  },
  methods: {
    onShowOptions () {
      this.optionsShowing = !this.optionsShowing
    },
    switchLanguage (option: ILanguageOption) {
      this.$store.commit(COMMON_KEYS.setLanguage, option)
      this.$i18n.locale = option.value
      this.optionsShowing = false
      window.localStorage.setItem('lang', option.value)
      window.location.reload()
    },
    onClickOutside () {
      this.optionsShowing = false
    }
  }
})
</script>

<style lang="scss">
@import 'src/assets/variables';

.lang-switcher {
  position: relative;
  display: inline-block;
  text-align: left;
  color: $primary-font-color;
  font-weight: 600;

  .lang-switcher__item {
    padding: 10px 11px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: $normal-color;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: $normal-hover-color;
    }

    &._block {
      display: flex;
      justify-content: space-between;
    }
  }

  .lang-switcher__list {
    position: absolute;
    right: 0;
    z-index: 10;
    padding: 12px;
    background: $white;
    box-shadow: $option-outer-box-shadow;
    border-radius: 12px;
    border: $container-border;
    margin-top: 4px;
    min-width: calc(100% - 24px);
  }

  .lang-switcher__language__icon {
    margin-right: 6px;
  }

  .lang-switcher__language__arrow-down {
    margin-left: 12px;
  }

  .lang-switcher__list__label {
    padding: 6px 12px;
    font-size: $font-size-14;
    font-weight: 500;
    color: $third-font-color;
    line-height: 16px;
  }

  .lang-switcher__list__item {
    display: flex;
    padding: 12px;
    cursor: pointer;
    white-space: nowrap;
    font-size: $font-size-16;
    font-weight: 500;
    color: $primary-font-color;

    &:hover {
      border-radius: 8px;
      background: $normal-color;
    }
  }

  .lang-switcher__list__item__icon {
    margin-right: 8px;
  }
}
</style>

<template>
  <button
    v-bind="$attrs"
    class="button"
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="onClick"
    v-on="$listeners"
  >
    <span
      v-if="loading"
      class="button__loading-icon"
      :class="{'button__loading-icon__margin-right-8': !!$slots.default}"
    >
      <Iconfont name="loading" />
    </span>
    <slot />
    <Iconfont
      v-if="outlink"
      class="button__out-link-icon"
      name="arrow-right-up"
      size="8"
      :color="outLinkIconColor"
    />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Iconfont from '~/components/icon/Iconfont.vue'

enum ButtonType {
  default = 'default',
  solid = 'solid',
  dashed = 'dashed'
}

enum ButtonSize {
  small = 'small',
  middle = 'middle',
  large = 'large',
  super = 'super'
}

enum ButtonStatus {
  default = 'default',
  primary = 'primary',
  normal = 'normal',
  success = 'success',
  error = 'error',
}

enum ButtonShape {
  default = 'default',
  round = 'round'
}

export default Vue.extend({
  name: 'Button',
  components: {
    Iconfont
  },
  inheritAttrs: false,
  props: {
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: String as PropType<ButtonType>,
      default: ButtonType.default
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: ButtonSize.large
    },
    status: {
      type: String as PropType<ButtonStatus>,
      default: ButtonStatus.default
    },
    shape: {
      type: String as PropType<ButtonShape>,
      default: ButtonShape.default
    },
    outlink: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  computed: {
    outLinkIconColor (): string {
      if (this.disabled) {
        return '#ffffff'
      }
      else if ([ButtonStatus.default, ButtonStatus.normal].includes(this.status)) {
        return '#121314'
      }
      else {
        return '#ffffff'
      }
    },
    buttonClass (): string[] {
      const _class = [
        `button__border__${this.border}`,
        `button__size__${this.size}`,
        `button__status__${this.status}`,
        `button__shape__${this.shape}`
      ]
      if (this.block) {
        _class.push('button__block')
      }
      return _class
    }
  },
  methods: {
    onClick () {
      if (this.to) {
        this.$router.push(this.to)
      }
      else if (this.href && this.target === '_blank') {
        window.open(this.href)
      }
      else if (this.href) {
        window.location.href === this.href
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  outline: none;
  cursor: pointer;
}

.button__block {
  width: 100%;
}

.button__loading-icon {
  svg {
    animation: rotate360DegAnimation 0.9s linear infinite;
  }
}

.button__loading-icon__margin-right-8 {
  margin-right: 4px;
}

.button__out-link-icon {
  margin-top: -12px !important;
  margin-left: 2px !important;
}

.button__border__default {
  border: none;
  box-shadow: none;
}

.button__border__solid {
  border: 1px solid;
  box-shadow: none;
}

.button__border__dashed {
  border: 1px dashed;
  box-shadow: none;
}

.button__size__small {
  height: 38px;
  padding: 0 12px;
  font-size: $font-size-14;
  font-weight: 500;

  &.button__shape__default {
    border-radius: 8px;
  }

  &.button__shape__round {
    border-radius: 19px;
  }
}

.button__size__middle {
  height: 42px;
  padding: 0 16px;
  font-size: $font-size-16;
  font-weight: 500;

  &.button__shape__default {
    border-radius: 12px;
  }

  &.button__shape__round {
    border-radius: 21px;
  }
}

.button__size__large {
  height: 52px;
  padding: 0 16px;
  font-size: $font-size-16;
  font-weight: 500;

  &.button__shape__default {
    border-radius: 14px;
  }

  &.button__shape__round {
    border-radius: 26px;
  }
}

.button__size__super {
  height: 60px;
  padding: 0 16px;
  font-size: $font-size-16;
  font-weight: 500;

  &.button__shape__default {
    border-radius: 14px;
  }

  &.button__shape__round {
    border-radius: 30px;
  }
}

.button__status__default {
  color: $primary-font-color;
  background: $normal-color;

  &:disabled {
    cursor: no-drop;
    color: rgba(17, 20, 45, 0.3);
  }

  &:hover {
    background: $normal-hover-color;
  }
}

.button__status__primary {
  color: $white;
  background: $primary-color;

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }

  &:hover {
    background: $primary-hover-color;
  }
}

.button__status__normal {
  color: $primary-font-color;
  background: $white;

  &:disabled {
    cursor: no-drop;
    color: rgba(17, 20, 45, 0.3);
    background: $white !important;
  }

  &:hover {
    background: $normal-hover-color;
  }
}

.button__status__success {
  color: $white;
  background: $success-color;

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }

  &:hover {
    background: $success-hover-color;
  }
}

.button__status__error {
  color: $white;
  background: $error-color;

  &:disabled {
    cursor: no-drop;
    color: $white;
    background: $disabled-color !important;
  }

  &:hover {
    background: $error-hover-color;
  }
}
</style>

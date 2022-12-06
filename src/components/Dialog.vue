<template>
  <div>
    <transition name="dialog-mask">
      <div
        v-if="showing"
        class="dialog__mask"
      />
    </transition>
    <transition name="dialog">
      <div
        v-if="showing"
        class="dialog"
      >
        <div class="dialog__container">
          <ContentHeader
            v-if="!$slots.title"
            :class="{ 'dialog__no-title': !title }"
            :title="title"
            :closeButton="closeButton"
            @close="onClose"
          />
          <div v-else>
            <slot name="title" />
          </div>
          <div
            class="dialog__container__layout"
            :style="{
              maxHeight: containerLayoutMaxHeight
            }"
          >
            <div v-if="$slots.default">
              <slot name="default" />
            </div>
            <div
              v-else
              class="dialog__content"
            >
              {{ message }}
              <a
                v-if="txHash"
                class="dialog__tx-hash"
                :href="txHashLink"
                target="_blank"
              >
                {{ collapseString(txHash, 5, 5) }}
                <Iconfont
                  class="dialog__tx-hash__icon"
                  name="arrow-right"
                  color="#B0B8BF"
                  size="14"
                />
              </a>
            </div>
            <div
              v-if="$slots.action"
              class="dialog__action"
            >
              <slot name="action" />
            </div>
            <div
              v-if="enableCloseAction"
              class="dialog__action"
            >
              <Button
                shape="round"
                status="success"
                block
                @click="onClose(false)"
              >
                {{ actionButtonText || $tt('OK') }}
              </Button>
            </div>
            <div class="dialog__container__layout__placeholder" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContentHeader from '~/components/ContentHeader.vue'
import Button from '~/components/Button.vue'
import { collapseString } from '~/modules/tools'
import Iconfont from '~/components/icon/Iconfont.vue'

export default Vue.extend({
  name: 'Dialog',
  components: {
    ContentHeader,
    Button,
    Iconfont
  },
  model: {
    prop: 'showing',
    event: 'close'
  },
  props: {
    showing: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    actionButtonText: {
      type: String
    },
    closeButton: {
      type: Boolean,
      default: false
    },
    enableCloseAction: {
      type: Boolean,
      default: false
    },
    txHash: {
      type: String,
      default: ''
    },
    txHashLink: {
      type: String,
      default: ''
    }
  },
  computed: {
    containerLayoutMaxHeight (): string {
      return `${window.innerHeight * 0.9 - 92}px`
    }
  },
  watch: {
    showing (newVal) {
      if (newVal) {
        document.documentElement.style.overflowY = 'hidden'
      }
      else {
        document.documentElement.style.overflowY = 'auto'
      }
    }
  },
  beforeDestroy () {
    document.documentElement.style.overflowY = 'auto'
  },
  methods: {
    collapseString,
    onClose (value: boolean) {
      this.$emit('close', value)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "src/assets/variables";

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 30;
}

.dialog__mask {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgba(27, 29, 33, 0.7);
  z-index: 30;
}

.dialog__no-title {
  padding-bottom: 0;
}

.dialog__container {
  width: 92%;
  max-width: 394px;
  max-height: 90%;
  align-self: center;
  border-radius: 24px;
  background: $white;
  overflow: hidden;
}

.dialog__container__layout {
  padding: 0 32px 0 32px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }
}

.dialog__content {
  font-size: $font-size-14;
  color: $primary-font-color;
  line-height: 20px;
  word-break: break-word;
}

.dialog__action {
  padding-top: 32px;
}

.dialog__container__layout__placeholder {
  padding-bottom: 32px;
}

.dialog__tx-hash {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: $font-size-12;
  font-weight: 400;
  color: $third-font-color;
  line-height: 14px;
  margin-top: 10px;
}

.dialog__tx-hash__icon {
  margin-left: -2px;
}

.dialog-enter-active {
  animation: fadeInUp 0.15s cubic-bezier(0.75, 0.25, 0.25, 0.75);
}

.dialog-leave-active {
  animation: fadeOutDown 0.15s cubic-bezier(0.75, 0.25, 0.25, 0.75);
}

.dialog-mask-enter-active {
  animation: fadeIn 0.15s cubic-bezier(0.75, 0.25, 0.25, 0.75);
}

.dialog-mask-leave-active {
  animation: fadeOut 0.15s cubic-bezier(0.75, 0.25, 0.25, 0.75);
}
</style>

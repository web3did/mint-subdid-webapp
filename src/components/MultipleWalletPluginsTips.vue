<template>
  <Dialog
    :showing="showing"
    :title="$tt('Tips')"
    closeButton
    @close="onClose"
  >
    {{ $tt("Please check if you are using multiple wallet plugins. Please disable multiple wallet plugins, keep only one wallet plugin and try again. If it still doesn't work, please join .bit community and open a ticket for support: ") }}
    <span
      class="multiple-wallet-plugins-tips_link"
      @click="goDiscord"
    >
      https://discord.gg/did
    </span>
    <template #action>
      <Button
        shape="round"
        status="success"
        block
        @click="onClose"
      >
        {{ $tt('OK') }}
      </Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Dialog from '~/components/Dialog.vue'
import Button from '~/components/Button.vue'
import { isMobile } from '~/modules/tools'

export default Vue.extend({
  name: 'MultipleWalletPluginsTips',
  components: {
    Dialog,
    Button
  },
  model: {
    prop: 'showing',
    event: 'close'
  },
  props: {
    showing: {
      type: Boolean,
      required: true
    },
    $tt: {
      type: Function as PropType<(key: string, params?: Record<string, string| number>) => string>,
      required: true
    }
  },
  data () {
    return {
      discordLink: 'https://discord.gg/did'
    }
  },
  computed: {
    isMobile
  },
  methods: {
    onClose () {
      this.$emit('close', false)
    },
    goDiscord () {
      if (this.isMobile) {
        window.location.href = this.discordLink
      }
      else {
        window.open(this.discordLink)
      }
    }
  }
})
</script>

<style lang="scss">
@import "src/assets/variables";

.multiple-wallet-plugins-tips_link {
  cursor: pointer;
  color: $link-font-color;

  &:hover {
    color: $link-hover-font-color
  }
}

.multiple-wallet-plugins-tips_action {
  padding: 32px;
}
</style>

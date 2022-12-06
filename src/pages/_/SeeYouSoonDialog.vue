<template>
  <Dialog
    :showing="showing"
    :title="$tt('See you soon')"
    closeButton
    @close="onClose"
  >
    <div>{{ $tt('This campaign has ended. Thank you for your love and support for .bit! See you next time!') }}</div>
    <template #action>
      <Button
        shape="round"
        block
        status="success"
        @click="onLearnMore"
      >
        {{ $tt('Learn more about .bit') }}
      </Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { isMobile } from '~/modules/tools'
import Dialog from '~/components/Dialog.vue'
import Button from '~/components/Button.vue'

export default Vue.extend({
  name: 'SeeYouSoonDialog',
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
    }
  },
  computed: {
    isMobile,
  },
  methods: {
    onClose () {
      this.$emit('close', false)
    },
    onLearnMore () {
      const link = 'https://www.did.id/'
      if (this.isMobile) {
        window.location.href = link
      }
      else {
        window.open(link)
      }
    }
  }
})
</script>

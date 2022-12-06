import { Context } from '@nuxt/types'
import { TranslateResult } from 'vue-i18n'
import Dialog from '~/components/Dialog.vue'
import { sleep } from '~/modules/tools'

export interface IAlertOptions {
  title: string | TranslateResult,
  message: string | TranslateResult,
  actionButtonText?: string,
  closeButton?: boolean,
  enableCloseAction?: boolean,
  txHash?: string,
  txHashLink?: string,
}

export default function ({ app }: Context, inject: Function) {
  inject('alert', (options: IAlertOptions) => {
    const _instance = new Dialog({
      propsData: {
        showing: false,
        actionButtonText: app.$tt('OK'),
        enableCloseAction: true,
        closeButton: true,
        ...options
      }
    })
    const _vm = _instance.$mount()
    _instance.$on('close', async () => {
      _instance.showing = false
      await sleep(200)
      document.body.removeChild(_vm.$el)
    })
    document.body.appendChild(_vm.$el)
    _instance.showing = true
  })
}

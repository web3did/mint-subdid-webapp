import { ActionTree, GetterTree, MutationTree } from 'vuex'
import cookie from 'js-cookie'
import { augmentKeys } from '~/modules/tools'
import { matchLanguage } from '~/plugins/i18n'
import { LANGUAGE, LanguageOptions } from '~/constant/language'

const keys = {
  namespace: 'common',
  // mutations
  setHardwareWalletTipsShow: 'setHardwareWalletTipsShow',
  setTorusLoginSuccessTipsShow: 'setTorusLoginSuccessTipsShow',
  setLanguage: 'setLanguage',
  // actions
  // getters
  computedLanguage: 'computedLanguage'
}

export const state = () => ({
  version: '0.0.1',
  language: '',
  hardwareWalletTipsShow: true,
  torusLoginSuccessTipsShow: undefined
})

export type CommonState = ReturnType<typeof state>

export const mutations: MutationTree<CommonState> = {
  [keys.setHardwareWalletTipsShow]: (state, value: boolean) => {
    state.hardwareWalletTipsShow = value
  },
  [keys.setTorusLoginSuccessTipsShow]: (state, value: boolean) => {
    // @ts-ignore
    state.torusLoginSuccessTipsShow = value
  }
}

export const actions: ActionTree<CommonState, CommonState> = {

}

export const getters: GetterTree<CommonState, CommonState> = {
  [keys.computedLanguage] (state) {
    const ua = window.navigator.userAgent.match(/Language\/([a-zA-Z-_]+)/)
    const query = window.location.search.match(/[&?]lang=([a-zA-Z-_]+)/)
    const uaLanguage = ua?.[1]
    const queryLanguage = query?.[1]

    return matchLanguage(
      localStorage.getItem('lang') || cookie.get('lang') || state.language || queryLanguage || uaLanguage || window.navigator.language,
      LanguageOptions,
      LANGUAGE.en
    )
  }
}

export const COMMON_KEYS = augmentKeys(keys, keys.namespace)

import { Context } from '@nuxt/types'
import { extend, setInteractionMode } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { formatsByName } from '@ensdomains/address-encoder'
import Web3Utils from 'web3-utils'
import { $tt } from '~/plugins/i18n'

setInteractionMode('lazy')

export default function ({ app }: Context) {
  // field required
  extend('required', {
    ...required,
    message: (fieldName: any): string => {
      return $tt('Invalid {fieldName}', { fieldName })
    }
  })

  // check address format
  extend('address', {
    params: ['key'],
    message: (fieldName: any, args: any): string => {
      const symbol = args.key
      return $tt('{symbol} address format is wrong', { symbol })
    },
    validate (value: string, args: any): boolean {
      try {
        const symbol = args.key
        const address = value
        if (symbol === 'ETH') {
          return /^0x[0-9a-f]{40}$/i.test(address) && Web3Utils.isAddress(address)
        }
        if (!formatsByName[symbol]) {
          return true
        }
        formatsByName[symbol].decoder(address)
        return true
      }
      catch (err) {
        console.error(err)
        return false
      }
    }
  })
}

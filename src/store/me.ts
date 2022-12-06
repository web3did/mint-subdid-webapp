import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { augmentKeys } from '~/modules/tools'
import { ChainType, CoinType, CoinTypeToChainIdMap, EvmCoinTypes, IMainChain } from '~/constant/chain'
import { WalletProtocol } from '~/constant'

export interface IConnectedAccount {
  address: string
  chain: IMainChain,
  protocol: WalletProtocol
}

const keys = {
  namespace: 'me',
  // mutations
  setInviter: 'setInviter',
  setChannel: 'setChannel',
  setConnectedAccount: 'setConnectedAccount',
  // actions
  // getters
  computedChainType: 'computedChainType',
  computedChainId: 'computedChainId'
}

export const state = () => ({
  inviter: '',
  channel: '',
  connectedAccount: {
    address: ''
  } as IConnectedAccount
})

export type MeState = ReturnType<typeof state>

export const mutations: MutationTree<MeState> = {
  [keys.setInviter]: (state, inviter: string) => {
    state.inviter = inviter
  },
  [keys.setChannel]: (state, channel: string) => {
    state.channel = channel
  },
  [keys.setConnectedAccount]: (state, connectedAccount: IConnectedAccount) => {
    state.connectedAccount = {
      ...state.connectedAccount,
      ...connectedAccount
    }
  }
}

export const actions: ActionTree<MeState, MeState> = {
}

export const getters: GetterTree<MeState, MeState> = {
  [keys.computedChainType] (state): number | undefined {
    const coinType = state.connectedAccount.chain?.coinType
    let value
    if (EvmCoinTypes.includes(coinType)) {
      value = ChainType.eth
    }
    else if ([CoinType.trx].includes(coinType)) {
      value = ChainType.tron
    }
    return value
  },
  [keys.computedChainId] (state): number | undefined {
    const coinType = state.connectedAccount.chain?.coinType
    return CoinTypeToChainIdMap[coinType]
  }
}

export const ME_KEYS = augmentKeys(keys, keys.namespace)

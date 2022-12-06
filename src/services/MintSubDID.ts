import { BasicService } from '~/services/BasicService'

export interface ICheckSubdidRes {
  account: string,
  main_account: string,
  register_status: number,
}

export interface IMintSubdidParams {
  account: string,
  ownerKey: string,
  ownerCoinType: string,
}

export interface IMintSubdidRes {
  account: string,
  registering_status: number,
}

export default class MintSubDID extends BasicService {
  /**
   * check SubDID
   * @param account
   */
  checkSubdid (account: string): Promise<ICheckSubdidRes> {
    return this.axios.get('/sfbw22/check-subdid', {
      params: {
        account
      }
    })
  }

  /**
   * mint SubDID
   * @param account
   * @param ownerKey
   * @param ownerCoinType
   */
  mintSubdid ({
    account,
    ownerKey,
    ownerCoinType,
  }: IMintSubdidParams): Promise<IMintSubdidRes> {
    return this.axios.post('/sfbw22/mint-subdid', {
      account,
      owner_key: ownerKey,
      owner_coin_type: ownerCoinType,
    })
  }
}

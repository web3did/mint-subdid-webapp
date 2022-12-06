import MintSubDID from './MintSubDID'

export class Services {
  mintSubDID: MintSubDID

  constructor () {
    this.mintSubDID = new MintSubDID()
  }
}

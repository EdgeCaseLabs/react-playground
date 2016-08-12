import alt from '../alt'
import AltDataDemoActions from '../actions/AltDataDemoActions'


function getError(data){
    let jqXhr = data[0]
    let textStatus = data[1]
    let errorThrown = data[2]
    console.log("getError: "+jqXhr)
    console.log("getError: "+textStatus)
    console.log("getError: "+errorThrown)
    if(jqXhr.responseJSON.message != undefined){
      return jqXhr.responseJSON.message
    }else{
      return errorThrown
    }
}

class AltDataDemoStore {
  constructor() {
    this.bindActions(AltDataDemoActions)
    this.carts = []
    this.dismissCart = null
    this.dismissComment = null
    this.error = null
  }

  onGetCartsSuccess(data) {
    this.carts = data
    this.error = null
  }

  onGetCartsFail(data) {
    this.error = getError(data)
  }

  onToggleModal(data) {
    this.dismissCart = data
    this.dismissComment = null //always reset this
  }

  onDismissCartSuccess(data) {
    this.carts = data
    this.error = null
  }

  onDismissCartFail(data) {
    this.error = getError(data)
  }

}

export default alt.createStore(AltDataDemoStore)

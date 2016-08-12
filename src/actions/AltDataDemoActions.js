import alt from '../alt'
//import { ajax, support } from 'jquery'
import 'whatwg-fetch';

class AltDataDemoActions {
  constructor() {
    this.generateActions(
      'getCartsSuccess',
      'getCartsFail',
      'toggleModal',
      'dismissCartSuccess',
      'dismissCartFail'
    )
  }

  getCarts() {
    // ajax({ url: '/api/altdatademo/' })
    //   .done((data) => {
    //     this.getCartsSuccess(data['carts'])
    //   })
    //   .fail((jqXhr, textStatus, errorThrown) => {
    //     this.getCartsFail([jqXhr, textStatus, errorThrown])
    //   })

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        debugger;
        let msg = response.statusText;
        //if(response.bodyUsed){
          msg = response.json().message
        //}
        var error = new Error(msg)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json()
    }

    fetch('/api/altdatademo/')
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        console.log('request succeeded with JSON response', data)
        this.getCartsSuccess(data['carts'])
      }).catch((error) => {
        console.log('request failed', error)
        this.getCartsFail(error.message)
      })

    return false
  }

  dismissCart(dismissCart, dismissComment){
    // ajax({ 
    //       url: '/admin/api/altdatademo/', 
    //       data: {'userId': dismissCart.userID, 'dismissComment': dismissComment}, 
    //       type: 'POST'
    //   })
    //   .done((data) => {
    //     this.dismissCartSuccess(data['carts'])
    //     this.toggleModal(null)
    //   })
    //   .fail((jqXhr, textStatus, errorThrown) => {
    //     this.dismissCartFail([jqXhr, textStatus, errorThrown])
    //   })
    return false    
  }


}

export default alt.createActions(AltDataDemoActions)

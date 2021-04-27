'use strict'

const Antl = use('Antl');

class betsBetUpdate {
  get validateAll() {
    return true;
  }


  get rules() {
    return {
      // validation rules
      numbers: 'required',
      price: 'required',
    }
  }


  get messages() {
    return Antl.list('Validation')
  }
}

module.exports = betsBetUpdate

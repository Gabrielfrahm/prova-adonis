'use strict'

const Antl = use('Antl');

class gamesGameUpdate {
  get validateAll() {
    return true;
  }


  get rules() {
    return {
      // validation rules
      type: 'required|unique:games',
      description: 'required',
      color: 'required',
      price: 'required',
      minCartValue: 'required',
      maxNumber: 'required',
      range: 'required',
    }
  }

  get messages() {
    return Antl.list('Validation')
  }
}

module.exports = gamesGameUpdate

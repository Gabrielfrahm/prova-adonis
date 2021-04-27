'use strict'
const Antl = use('Antl');
class Session {

  get validateAll (){
    return true;
  }

  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }
  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Session

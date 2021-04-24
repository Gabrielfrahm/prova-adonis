'use strict'
const Antl = use('Antl');

class ForgotPassword {
  get validateAll (){
    return true;
  }

  get rules () {
    return {
      // validation rules
      email: 'required|email',
    }
  }
  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = ForgotPassword

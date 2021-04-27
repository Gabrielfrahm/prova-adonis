'use strict'
const Antl = use('Antl');
class ResetPassword {

  get validateAll (){
    return true;
  }

  get rules () {
    return {
      // validation rules
      token: 'required',
      password: 'required|confirmed',
    }
  }
  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = ResetPassword

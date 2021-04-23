'use strict'

class usersUserCreate {
  get validateAll (){
    return true;
  }


  get rules () {
    return {
      // validation rules
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    }
  }
}

module.exports = usersUserCreate

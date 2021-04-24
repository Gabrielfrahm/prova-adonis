'use strict'

const Antl = use('Antl');
class usersUserCreate {
  get validateAll() {
    return true;
  }


  get rules() {
    return {
      // validation rules
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    }
  }

  get messages() {
    return Antl.list('Validation')
  }
}

module.exports = usersUserCreate

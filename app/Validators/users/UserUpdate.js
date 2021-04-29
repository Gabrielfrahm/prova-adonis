'use strict'

class usersUserCreate {
  get validateAll (){
    return true;
  }

  get rules () {
    const userId = this.ctx.params.id;
    return {
      // validation rules
      name: 'required',
      email: `unique:users,email,id,${userId}`,
      password: 'required|confirmed',

    }
  }
}

module.exports = usersUserCreate

'use strict'
const User = use('App/Models/User');

class UserController {
  async index({request}) {
    const {page} = request.get();
    const users = await  User.query().paginate(page);

    return users;
  }

  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }



}

module.exports = UserController

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

  async show({params}){
    const user = await User.findOrFail(params.id);

    return user;
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id);

    const data = request.only(['name', 'email', 'password']);

    user.merge(data);

    await user.save();
    return user;
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}

module.exports = UserController

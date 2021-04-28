'use strict'
const User = use('App/Models/User');
const Mail = use('Mail');

class UserController {
  async index({ request, response }) {
    try {
      const { page } = request.get();
      const users = await User.query().paginate(page);
      return users;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async store({ request , response}) {
    try {
      const { name, email, password } = request.only(['name', 'email', 'password']);
      const user = await User.create({ name, email, password });
      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async show({ params, response }) {
    try {
      const user = await User.findByOrFail('id', params.id);
      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findByOrFail('id', params.id);

      const data = request.only(['name', 'email', 'password']);

      user.merge(data);

      await user.save();
      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async destroy({ params, response }) {
    try {
      const user = await User.findByOrFail('id', params.id);
      await user.delete();
      return response.status(200).send( {message: 'Delete' });
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }
}


module.exports = UserController

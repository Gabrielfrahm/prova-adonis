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
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }

  async store({ request , response}) {
    try {
      const { name, email, password } = request.only(['name', 'email', 'password']);

      const checkUser = await User.findBy('email', email);
      if (checkUser) {
        return response.status(401).send({ error: { message: 'user already existing' } })
      }
      const user = await User.create({ name, email, password });

      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }

  async show({ params, response }) {
    try {
      const user = await User.findBy('id', params.id);
      if (!user) {
        return response.status(400).send({ error: { message: 'user not found' } });
      }
      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }

  async update({ params, request, response }) {
    try {
      const user = await User.findBy('id', params.id);

      if (!user) {
        return response.status(400).send({ error: { message: 'user not found' } });
      }

      const data = request.only(['name', 'email', 'password']);

      user.merge(data);

      await user.save();
      return user;
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }

  async destroy({ params, response }) {
    try {
      const user = await User.findBy('id', params.id);

      if (!user) {
        return response.status(400).send({ error: { message: 'user not found' } });
      }
      await user.delete();
      return response.status(200).send( {message: 'Delete' });
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }
}


module.exports = UserController

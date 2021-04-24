'use strict'
const User = use('App/Models/User');
const Mail = use('Mail');

class UserController {
  async index({ request }) {
    const { page } = request.get();
    const users = await User.query().paginate(page);


    return users;
  }

  async store({ request }) {
    const {name, email , password} = request.only(['name', 'email', 'password']);

    const checkUser = await User.findBy('email', email);
    if (checkUser) {
      return response.status(401).send({ error: { message: 'user already existing' } })
    }
    const user = await User.create({name, email , password});

    await Mail.send(
      ['emails.signUp'],
      {
        name,
      },
      message => {
        message
          .to(email)
          .from('notResponde@TLG.com', 'Equipe TLG | <>')
          .subject('cadastro na plataforma')
      }
    )

    return user;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    return user;
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);

    const data = request.only(['name', 'email', 'password']);

    user.merge(data);

    await user.save();
    return user;
  }

  async destroy({ params }) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}

module.exports = UserController

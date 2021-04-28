'use strict'

const moment = require('moment');
const crypto = require('crypto');
const User = use('App/Models/User');
const Mail = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();
      await Mail.send(['emails.forgot_password'], {
        email,
        token: user.token,
        link: `http://localhost:3000/reset-password?token=${user.token}`
      }, message => {
        message
          .to(user.email)
          .from('gabriel.frahm@luby.software')
          .subject('Recuperação de senha')
      });
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();
      const user = await User.findByOrFail('token', token);

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(err.status).send({ error: { message: 'o token esta vencido' } })
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();

    } catch (err) {
      return response.status(401).send({ error: { message: 'algo deu errado' } })
    }
  }
}

module.exports = ForgotPasswordController;

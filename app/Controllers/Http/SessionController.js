'use strick'
const { v4 } = require('uuid')
const Token = use('App/Models/Token');
const User = use('App/Models/User');
class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();
    try {
      const user = await User.findByOrFail('email', email);

      const token = await auth.attempt(email, password);
      if (token) {
        await Token.create({
          user_id: user.id,
          token: v4(),
        });
        return { token, user }
      }
      return;
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'erro ao tentar fazer login check suas credenciais' } })
    }
  }
}

module.exports = SessionController;

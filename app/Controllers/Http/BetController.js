'use strict'

const Bet = use('App/Models/Bet');
const Mail = use('Mail');
class BetController {

  async index({ response, params, auth }) {
    try {
      const user = await auth.getUser(response.header);
      if (params.game_id) {
        const filterBets = await Bet.query().where({
          'game_id': params.game_id,
          'user_id': user.id,
        }).fetch();
        return filterBets;
      } else {
        const bets = await Bet.query().where('user_id', user.id).fetch();
        return bets;
      }

    } catch (err) {
      return response.status(400).send({ error: { message: err.message } });
    }
  }

  async store({ request, response, auth }) {
    try {
      const arrayGame = request.only(
        ["itemInCart"]
      );

      let games = [];

      const user = await auth.getUser(response.header);

      for (let i = 0; i < arrayGame.itemInCart.length; i++) {
        const checkBet = await Bet.findBy({ user_id: arrayGame.itemInCart[i].user_id, numbers: arrayGame.itemInCart[i].numbers });
        if (checkBet) {
          return response.status(400).send({ error: { message: 'you already have these numbers for the bet' } });
        }
        const arr = arrayGame.itemInCart[i].numbers.split(',');
        if (new Set(arr).size !== arr.length) {
          return response.status(400).send({ error: { message: `you have number repete` } })
        }
        games.push({
          numbers: arrayGame.itemInCart[i].numbers,
          price: arrayGame.itemInCart[i].price,
        });
      }

      const bet = await Bet.createMany(arrayGame.itemInCart);

      await Mail.send(
        ['emails.new_bet'],
        {
          name: user.name ,
          games: JSON.stringify(games),
        },
        message => {
          message
            .to(user.email)
            .from('notResponde@TLG.com', 'Equipe TLG | <>')
            .subject('novo jogo realizado')
        }
      );
      return bet;

    } catch (err) {
      return response.status(400).send({ error: { message: err.message } });
    }

  }

  async show({ params, response, auth }) {
    try {
      const user = await auth.getUser(response.header);
      const bet = await Bet.findByOrFail({
        id: params.id,
        game_id: params.game_id,
        user_id: user.id
      });
      return bet;
    } catch (err) {
      return response.status(400).send({ error: { message: err.message } });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only([
        'numbers',
        'price',
      ]);
      const bet = await Bet.findBy('id', params.id);
      bet.merge(data);
      await bet.save();
      return bet;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }

  }

  async destroy({ params, response }) {
    try {
      const bet = await Bet.findByOrFail('id', params.id);
      await bet.delete();
      return response.status(200).send({ message: 'bet deleted success' });
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }
}

module.exports = BetController

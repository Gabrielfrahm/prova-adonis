'use strict'

const Bet = use('App/Models/Bet');
const Game = use('App/Models/Game');
class BetController {

  async index({ response, params, auth }) {
    try {
      const user = await auth.getUser(response.header);
      if (params.game_id) {
        // const filterBets = await Bet.query().where('user_id', user.id, 'game_id', params.game_id).fetch();
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

  async store({ request,  response, auth }) {
    try {
      const arrayGame = request.only([
        "games"
      ]);


      const user = await auth.getUser(response.header);
      const bet = await Bet.createMany(arrayGame.games);

      return bet;

      // // checa se o jogo existe
      // const checkGame = await Game.findBy('id', game_id);
      // if (!checkGame) {
      //   return response.status(401).send({ error: { message: 'game not found' } });
      // }
      // //checa se a aposta ja existe para esse usuário no mesmo dia
      // const checkBet = await Bet.findBy({ user_id: user.id, numbers: data.numbers });

      // if (checkBet) {
      //   return response.status(400).send({ error: { message: 'you already have these numbers for the bet' } });
      // }

      // //checa as regras do jogo para os números (quantidade de números alem do permitido)
      // const arr = data.numbers.split(',');
      // if (arr.length > checkGame.maxNumber || arr.length < checkGame.maxNumber) {
      //   return response.status(400).send({ error: { message: `violation rules of game max number ${checkGame.maxNumber}, you have ${arr.length}` } })
      // }

      // //checa se existe números repetidos
      // if (new Set(arr).size !== arr.length) {
      //   return response.status(400).send({ error: { message: `you have number repete` } })
      // }

      // //checa se existe números maior que a regra do jogo
      // const checkNumberValueOfGameRange = arr.some(item => {
      //   return item > checkGame.range;
      // });
      // if (checkNumberValueOfGameRange) {
      //   return response.status(400).send({ error: { message: `you have number bigger for rule of game` } })
      // }

      // //cria a aposta
      // const bet = await Bet.createMany({...data, user_id: use.id});



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

  async update({ params, request, response, auth }) {
    try {
      const data = request.only([
        'numbers',
        'price',
      ]);

      // checa se o jogo existe
      const checkGame = await Game.findBy('id', params.game_id);
      if (!checkGame) {
        return response.status(401).send({ error: { message: 'game not found' } });
      }
      //checa se o user existe
      const user = await auth.getUser(response.header);
      if (!user) {
        return response.status(401).send({ error: { message: 'user not found' } });
      }

      //checa se a aposta ja existe para esse usuário
      const checkBet = await Bet.findBy({ user_id: user.id, numbers: data.numbers });
      if (checkBet) {
        return response.status(401).send({ error: { message: 'you already have these numbers for the bet' } });
      }

      //checa as regras do jogo para os números (quantidade de números alem do permitido)
      const arr = data.numbers.split(',');
      if (arr.length > checkGame.maxNumber || arr.length < checkGame.maxNumber) {
        return response.status(400).send({ error: { message: `violation rules of game max number ${checkGame.maxNumber}, you have ${arr.length}` } })
      }

      //checa se existe números repetidos
      if (new Set(arr).size !== arr.length) {
        return response.status(400).send({ error: { message: `you have number repete` } })
      }

      //checa se existe números maior que a regra do jogo
      const checkNumberValueOfGameRange = arr.some(item => {
        return item > checkGame.range;
      });
      if (checkNumberValueOfGameRange) {
        return response.status(400).send({ error: { message: `you have number bigger for rule of game` } })
      }

      const bet = await Bet.findBy('id', params.id);

      bet.merge(data);

      await bet.save();

      return bet;

    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }

  }

  async destroy({ params, response, auth }) {
    try {
      // checa se o jogo existe
      const checkGame = await Game.findBy('id', params.game_id);
      if (!checkGame) {
        return response.status(401).send({ error: { message: 'game not found' } });
      }

      //checa se o user existe
      const user = await auth.getUser(response.header);
      if (!user) {
        return response.status(401).send({ error: { message: 'user not found' } });
      }

      //checa se a aposta ja existe para esse usuário
      const checkBet = await Bet.findBy({ user_id: user.id, id: params.id });
      if (!checkBet) {
        return response.status(401).send({ error: { message: 'you don`t have these numbers for the bet' } });
      }

      const bet = await Bet.findBy('id', params.id);
      await bet.delete();
      return response.status(200).send({ message: 'bet deleted success' });
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado' } });
    }
  }
}

module.exports = BetController

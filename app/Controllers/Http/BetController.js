'use strict'

const Bet = use('App/Models/Bet');
const Game = use('App/Models/Game');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with bets
 */
class BetController {
  /**
   * Show a list of all bets.
   * GET bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, params, auth }) {
    const user = await auth.getUser(request.header);
    if (!user) {
      return response.status(401).send({ error: { message: 'user not found' } });
    }
    const bets = await Bet.query().select('*').where('user_id', user.id).fetch();

    return bets;
  }


  /**
   * Create/save a new bet.
   * POST bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params, response, auth }) {

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

    //checa se a aposta ja existe para esse usuário no mesmo dia
    const checkBet = await Bet.findBy({ user_id: user.id, numbers: data.numbers });

    if (checkBet ) {
      return response.status(400).send({ error: { message: 'you already have these numbers for the bet' } });
    }

    //checa as regras do jogo para os números (quantidade de números alem do permitido)
    const arr = data.numbers.split(',');
    if(arr.length > checkGame.maxNumber || arr.length < checkGame.maxNumber ){
      return response.status(400).send({ error: { message: `violation rules of game max number ${checkGame.maxNumber}, you have ${arr.length}` } })
    }

    //checa se existe números repetidos
    if(new Set(arr).size !== arr.length){
      return response.status(400).send({ error: { message: `you have number repete` } })
    }

    //checa se existe números maior que a regra do jogo
    const checkNumberValueOfGameRange = arr.some(item => {
      return item > checkGame.range;
    });
    if(checkNumberValueOfGameRange){
      return response.status(400).send({ error: { message: `you have number bigger for rule of game` } })
    }

    //cria a aposta
    const bet = await Bet.create({ ...data, game_id: params.game_id, user_id: user.id });

    return bet;
  }

  /**
   * Display a single bet.
   * GET bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    const user = await auth.getUser(request.header);

    if (!user) {
      return response.status(401).send({ error: { message: 'user not found' } });
    }

    const bet = await Bet.findBy({ id: params.id, user_id: user.id });

    if (!bet) {
      return response.status(401).send({ error: { message: 'bet not found' } });
    }
    return bet;
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
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
    if(arr.length > checkGame.maxNumber || arr.length < checkGame.maxNumber ){
      return response.status(400).send({ error: { message: `violation rules of game max number ${checkGame.maxNumber}, you have ${arr.length}` } })
    }

    //checa se existe números repetidos
    if(new Set(arr).size !== arr.length){
      return response.status(400).send({ error: { message: `you have number repete` } })
    }

    //checa se existe números maior que a regra do jogo
    const checkNumberValueOfGameRange = arr.some(item => {
      return item > checkGame.range;
    });
    if(checkNumberValueOfGameRange){
      return response.status(400).send({ error: { message: `you have number bigger for rule of game` } })
    }

    const bet = await Bet.findBy('id', params.id);

    bet.merge(data);
    await bet.save();
    return bet;

  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params,  response, auth }) {
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

  }
}

module.exports = BetController

'use strict'

const Game = use('App/Models/Game');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { page } = request.get();
    const games = await Game.query().paginate(page);
    return games;
  }

  /**
   * Create/save a new game.
   * POST games
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      'type',
      'description',
      'color',
      'price',
      'minCartValue',
      'maxNumber',
      'range',
    ]);

    const checkGame = await Game.findBy('type', data.type);
    if (checkGame) {
      return response.status(401).send({ error: { message: 'Game already existing' } });
    }

    const game = await Game.create(data);
    return game;
  }

  /**
   * Display a single game.
   * GET games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const game = await Game.findBy('id', params.id);

    if(!game){
      return response.status(401).send({ error: { message: 'Game not  found' } });
    }
    return game;

  }


  /**
   * Update game details.
   * PUT or PATCH games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const game = await Game.findBy('id', params.id);

    if(!game){
      return response.status(401).send({ error: { message: 'Game not  found' } });
    }

    const data = request.only([
      'type',
      'description',
      'color',
      'price',
      'minCartValue',
      'maxNumber',
      'range',
    ]);

    game.merge(data);
    await game.save();
    return game;

  }

  /**
   * Delete a game with id.
   * DELETE games/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const game = await Game.findBy('id', params.id);

    if(!game){
      return response.status(401).send({ error: { message: 'Game not  found' } });
    }
    await game.delete();
    return  response.status(200).send({ message: 'game deleted success'  });
  }
}

module.exports = GameController

'use strict'

const Bet = use('App/Models/Bet');
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
  async index({ request, response, view }) {
  }


  /**
   * Create/save a new bet.
   * POST bets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params, response }) {
    const data = request.only([
      'user_id',
      'numbers',
      'price',
    ]);

    const bet = await Bet.create({ ...data, game_id: params.bets_id });

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
  async show({ params, request, response, view }) {
  }

  /**
   * Update bet details.
   * PUT or PATCH bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a bet with id.
   * DELETE bets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = BetController

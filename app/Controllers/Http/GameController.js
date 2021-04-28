'use strict'

const Game = use('App/Models/Game');

class GameController {

  async index({ response }) {
    try {
      const games = await Game.all();
      return games;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        'type',
        'description',
        'color',
        'price',
        'minCartValue',
        'maxNumber',
        'range',
      ]);

      const game = await Game.create(data);
      return game;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async show({ params, response }) {
    try {
      const game = await Game.findByOrFail('id', params.id);
      return game;
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }

  async update({ params, request, response }) {
    try {
      const game = await Game.findByOrFail('id', params.id);
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
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }
  async destroy({ params, response }) {
    try {
      const game = await Game.findByOrFail('id', params.id);
      await game.delete();
      return response.status(200).send({ message: 'game deleted success' });
    } catch (err) {
      return response.status(err.status).send({ error: { message: err.message } });
    }
  }
}

module.exports = GameController

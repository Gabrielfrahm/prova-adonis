'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  bets() {
    return this.hasMany('App/Models/Bet')
  }
}

module.exports = Game

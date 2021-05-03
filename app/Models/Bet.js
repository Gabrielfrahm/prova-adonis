'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {
  static boot() {
    super.boot()
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  game() {
    return this.belongsTo('App/Models/Game');
  }
}

module.exports = Bet

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bet extends Model {
  static boot() {
    super.boot()

    // this.addHook('afterCreate', 'SendMailHook.sendMail');
    // this.addHook('beforeUpdate', 'SendMailHook.sendMail');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  game() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Bet

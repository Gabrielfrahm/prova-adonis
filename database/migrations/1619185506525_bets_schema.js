'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BetsSchema extends Schema {
  up() {
    this.create('bets', (table) => {
      table.increments()
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('game_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('games')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('numbers').notNullable()
      table.decimal('price').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('bets')
  }
}

module.exports = BetsSchema

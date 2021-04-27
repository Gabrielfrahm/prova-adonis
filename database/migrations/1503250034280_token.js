'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokensSchema extends Schema {
  up() {
    this.create('tokens', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('token', 255).notNullable().unique().index()
      table.timestamps()
    })
  }

  down() {
    this.drop('tokens')
  }
}

module.exports = TokensSchema

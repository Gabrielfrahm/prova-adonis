'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GamesSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.string('color').notNullable()
      table.double('price').notNullable()
      table.integer('minCartValue').notNullable()
      table.integer('maxNumber').notNullable()
      table.integer('range').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GamesSchema

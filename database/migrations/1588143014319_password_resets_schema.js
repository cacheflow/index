'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PasswordResetsSchema extends Schema {
  up () {
    this.create('password_resets', (table) => {
      table.increments()
      table.string('email').notNullable()
      table.string('token').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetsSchema

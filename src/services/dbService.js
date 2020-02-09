const { Pool } = require('pg')

class dbService {
  constructor(connectionParams) {
    this._connectionParams = connectionParams
  }

  async readExecutionsRow(id) {
    console.log(`dbService.readExecutionsRow invoked: id = ${id}`)
    const queryText = 'select * from executions where id = $1'
    const pool = new Pool(this._connectionParams)
    const result = await pool.query(queryText, [id])
    const retval = result.rows[0]
    console.log(`dbService.readExecutionsRow finished: id = ${id}, retval = ${JSON.stringify(retval)}`)
    return retval
  }

  async insertRowIntoExecutions(newEntry) {
    console.log(`dbService.insertRowIntoExecutions invoked: newEntry = ${JSON.stringify(newEntry)}`)
    const queryText = 'insert into executions (timestamp, commands, result, duration) values (statement_timestamp(), $1, $2, $3) returning id'
    const insertValues = [newEntry.commands, newEntry.result, newEntry.duration ]
    const pool = new Pool(this._connectionParams)
    const result = await pool.query(queryText, insertValues)
    const id = result.rows[0].id
    console.log(`dbService.insertRowIntoExecutions finished: id = ${id}`)
    return id
  }
}

module.exports = dbService
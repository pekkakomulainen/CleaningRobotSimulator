class mockDbService {
  constructor(connectionParams) {
    this._entries = []
  }

  async readExecutionsRow(id) {
    console.log(`mockDbService.readExecutionsRow invoked: id = ${id}`)
    const retval = {...this._entries[id], timestamp: new Date(), id: id }
    console.log(`mockDbService.readExecutionsRow finished: id = ${id}, retval = ${JSON.stringify(retval)}`)
    return  retval
  }

  async insertRowIntoExecutions(newEntry) {
    console.log(`mockDbService.insertRowIntoExecutions invoked: newEntry = ${JSON.stringify(newEntry)}`)
    const newLength = this._entries.push(newEntry)
    console.log(`mockDbService.insertRowIntoExecutions finished: id = ${newLength}`)
    return newLength - 1
  }
}

module.exports = mockDbService
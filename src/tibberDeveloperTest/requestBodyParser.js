class enterPathReqBodyParser {
  constructor(body) {
    this._body = body
  }

  initialLocation() {
    return this._body.start
  }

  commands() {
    return this._body.commands
  }

  commandCount() {
    return this._body.commands ? this._body.commands.length : 0
  }
}

const getRequestBodyParser = (action, body) => ({
  '/enter-path': new enterPathReqBodyParser(body)
})[action]

module.exports = getRequestBodyParser
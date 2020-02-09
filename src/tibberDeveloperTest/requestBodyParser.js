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
}

const getRequestBodyParser = (action, body) => ({
  '/enter-path': new enterPathReqBodyParser(body)
})[action]

module.exports = getRequestBodyParser
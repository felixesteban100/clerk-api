import { StatusCodes } from 'http-status-codes'
const CustomAPIErrorModule = require('./custom-api');

class NotFoundErrorClass extends CustomAPIErrorModule {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundErrorClass;
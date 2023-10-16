import { StatusCodes } from 'http-status-codes'
const CustomAPIErrorModule = require('./custom-api');

class BadRequestErrorClass extends CustomAPIErrorModule{
    constructor(message: string){
        super(message);
        this.statusCodes = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestErrorClass
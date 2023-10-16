// const { CustomAPIError } = require('../errors')
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express';
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require('../errors/index')

type MiddlewareError =
  | typeof CustomAPIError
  | typeof UnauthenticatedError
  | typeof NotFoundError
  | typeof BadRequestError

function errorHandlerMiddleware(err: MiddlewareError, req: Request, res: Response, next: NextFunction) {
  let customError = {
    // set default 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }

  if (err.name === 'ValidationError') {
    type validationErrorObject = {
      name: string,
      message: string,
      properties: {
        message: string,
        type: string,
        path: string,
        value?: string
        enumValues?: string[],
      },
      kind: string,
      path: string,
      value?: string
    }
    const errArray: validationErrorObject[] = Object.values(err.errors)

    customError.msg = errArray
      .map((error: validationErrorObject) => {
        return error.message
      })
      .join(', ')

    customError.statusCode = 400
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 404
  }

  

  return res.status(customError.statusCode).json({ msg: customError.msg })
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware
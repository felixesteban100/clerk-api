import { Request, Response  } from 'express';

function notFound(req: Request, res: Response){
    res.status(404).send('Route does not exist')
}

module.exports = notFound
import { expressModule } from "./expressModule"

const routerAuth = expressModule.Router()

const { fetchClerkApi } = require('../controllers/auth')

routerAuth.route('/')
.get(fetchClerkApi)

module.exports = routerAuth
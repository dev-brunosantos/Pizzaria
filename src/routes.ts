import { Router } from 'express';
// IMPORTAÇÃO DOS CONTROLLERS DE USUÁRIOS
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

// IMPORTAÇÃO DOS CONTROLLERS DE CATEGORIAS
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

const router = Router()

// CRIANDO CADASTRO DE USUÁRIOS
router.post('/users', new CreateUserController().handle)
// LOGIN DOS USUÁRIOS
router.post('/session', new AuthUserController().handle)
// VALIDANDO LOGIN/TOKEN DOS USUÁRIOS
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -----------------------------------------------------------------------------------

// CADASTRO DE CATEGORIAS
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
// LISTANDO TODAS AS CATEGORIAS
router.get('/category', isAuthenticated, new ListCategoryController().handle)

export { router }
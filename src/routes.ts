import { Router } from 'express';
import multer from 'multer';

// IMPORTAÇÃO DOS CONTROLLERS DE USUÁRIOS
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

// IMPORTAÇÃO DOS CONTROLLERS DE CATEGORIAS
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer'

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

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

// -----------------------------------------------------------------------------------

// CADASTRO DE PRODUTOS
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router }
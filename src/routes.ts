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
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemControllers';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// CRIANDO CADASTRO DE USUÁRIOS
router.post('/users', new CreateUserController().handle)
// LOGIN DOS USUÁRIOS
router.post('/session', new AuthUserController().handle)
// VALIDANDO LOGIN/TOKEN DOS USUÁRIOS
router.get('/me', isAuthenticated, new DetailUserController().handle)

// ------------------------------------------------------------------------------------------------------------

// CADASTRO DE CATEGORIAS
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
// LISTANDO TODAS AS CATEGORIAS
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// ------------------------------------------------------------------------------------------------------------

// CADASTRO DE PRODUTOS
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
// LISTANDO PRODUTOS
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle )

// ------------------------------------------------------------------------------------------------------------

// CRIANDO PEDIDOS (ORDERS)
router.post('/order', isAuthenticated, new CreateOrderController().handle)
// ENVIANDO O PEDIDO ( REMOVE O CAMPOS DE "RASCUNHO" )
router.put('/order', isAuthenticated, new SendOrderController().handle)
// FECHANDO AS MESAS ( PROCEDIMENTO REALIZADO QUANDO PEDIDO AINDA NÃO FOI FINALIZADO )
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

// ADICIONANDO ITENS AO PEDIDO
router.post('/order/add', isAuthenticated, new AddItemController().handle)
// REMOVENDO ITENS DO PEDIDO
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

// ENVIANDO PEDIDO
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
// LISTANDO TODOS OS PEDIDOS
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
// LISTANDO TODOS OS PEDIDOS
router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle)
// FINALIZANDO PEDIDO ( CONCLUINDO PEDIDO )
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export { router }

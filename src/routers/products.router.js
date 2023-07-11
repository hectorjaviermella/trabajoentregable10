import { Router } from "express";

import { checkPermisosAdministrador } from "../middlewares/auth.js";

import { getProducts,getProductsById,addProduct, updateProducto,deleteProduct,mockingproducts} from "../controllers/products.controller.js";

export const productsRouter = Router();
//////////////////////////////////////////////////////////////////////////////////////////////
productsRouter.get("/", getProducts);

///////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
productsRouter.get("/:pId",getProductsById);
//////////////////////////////////////////////////////////////////////////////////////////////
productsRouter.post("/" ,addProduct);
//////////////////////////////////////////////////////////////////////////////////////
productsRouter.put("/",  updateProducto);
//////////////////////////////////////////////////////////////////////////////////////
productsRouter.delete("/:pId",  deleteProduct);
//////////////////////////////////////////////////////////////////////////////////////
//crea una lista de productos con facker para pruebas
productsRouter.get("/mockingproducts", mockingproducts);



export default productsRouter;

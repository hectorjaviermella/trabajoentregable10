
export default class CartsRepository {
 
  constructor(dao) {
    this.dao = dao;
  }
////////////////////////////////////////////////////////////////////////////  
    async getCarts() {
      try {
        console.log("entor carts repository");
       const carts = await this.dao.getCarts();      
      
       
        return carts;
      } catch (error) {
        throw new Error('Error retrieving carts from the database.');
      }
    }
////////////////////////////////////////////////////////////////////////////  
async getCartsById(cId) {
  try {
       

    const cart = await this.dao.getCartsById(cId);
    return cart;
  } catch (error) {
    throw new Error('Error retrieving the cart from the database.');
  }
}

////////////////////////////////////////////////////////////////////////////
async addCartVacio(cartData) {
  try {
    const createdCart = await this.dao.create(null);
    return createdCart;
  } catch (error) {
    throw new Error('Error creating the cart.');
  }
}
////////////////////////////////////////////////////////////////////////////
async createCart(cart) {
  try {
    //const cart = new cartModel(cartData);
    console.log("createCart reposi");
    const createdCart = await this.dao.createCart(cart);
    return createdCart;
  } catch (error) {
    throw new Error('Error creating the cart.');
  }
}

////////////////////////////////////////////////////////////////////////////
async updateCart(cId,cartnuevo) {
  try {
    const createdCart = await this.dao.updateCart( cId , cartnuevo);
    return createdCart;
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////
async deleteCart(cId) {
  try {
   
    let result = await  this.dao.deleteCart(cId);
  return result;
} catch (error) {
  console.log(error);
}
};
////////////////////////////////////////////////////////////////////////////    

async  updateQuantitytoProductToCart(cId,pId,pquantity){
  try {
 
    let result = await this.dao.updateQuantitytoProductToCart(cId,pId,pquantity);
     
     
    return result;
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////////////
async addProductToCart(cId,pId,pquantity){
  try {
  
      let result;
    //recupero el carrito
    
    const cart = await this.dao.getCartsById( cId );
    
    if (cart=== undefined){
      return  "No existe el carrito";
   };
         let productstocart = cart.products;                      
         let indexproduct = productstocart.findIndex((product) => product.pId._id.equals(pId)); 
      
            ///let indexproduct = productstocart.findIndex((product) => product.pId.toString() === pId.toString());  
            if (indexproduct === -1){ //no encontro el producto 
           
              
              const productagregar = {"pId" : Object(pId) , "quantity" : Number(pquantity.quantity)};
              productstocart.push(productagregar);
              cart.products=productstocart; 
              const cartsactualizado = await this.updateCart(cId,cart);        
              return result ="the cart was updated correctly." //cartsactualizado      

              }else{ //encontro el  producto en mi carrito
                  //preparar objeto a modificar                  
                  productstocart[indexproduct].quantity=productstocart[indexproduct].quantity +  Number(pquantity.quantity);
                cart.products=productstocart;           
                const cartsactualizado = await this.updateCart(cId,cart);             
                  return result ="the cart was updated correctly" //cartsactualizado
              } 
   
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////////////////
  
async deleteProductToCart(cId,pId){
  try {
    
      let result="";
      let tempcarrito = await  this.dao.getCartsById(cId); 
      if (tempcarrito)
           {
            let productstocart = tempcarrito.products;     
          
           let indiceProducto = productstocart.findIndex((product) => product.pId._id.equals(pId));               
            if (indiceProducto>=0)
                 {//encontrado el producto   
                               
                
                  result= await this.dao.deleteProductToCart(cId,pId );
                  return result;
                 }else{
                  //no encontrado producto
                 
                  
                  return result=false;                                 
                 }
           }else{
             //no existe el carrito
             return result="No exist cart";
           }
      
    //return result;
  } catch (error) {
    console.log(error);
  }
};  





  }  


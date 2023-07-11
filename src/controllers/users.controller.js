import  UsersService  from "../services/users.service.js";
import __dirname from "../utils.js";


const usersService = new UsersService();
////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
export async function getUsersById(req, res) {
    try {
       
       const uid = req.params.uid;  

       const users =  await usersService.getUserById(uid);
       if (!users) {
              return res.status(400).send({ status: "error", error: "No se encontro el usuario" });
         }else{
           return res.send({ status: "success", payload: users });
         }
  
        } catch (error) {
         // req.logger.debug(error.message); 
            console.log(error);
        }
     
   };
/////////////////////////////////////////////////////////////////////

export async function switchRol(req, res) {
   
    try {
       const uid = req.params.uid;   
        const usertoupdate =  await usersService.getUserById(uid);
      if (!usertoupdate) {
        return res
        .status(400)
        .send({ status: "error", error: "Incomplete values is product" });
      }
      //encuentra al primero que cumple la condicion id
      if (usertoupdate.role==='user')
            usertoupdate.role='premium';
      else{

          if (usertoupdate.role==='premium')
            usertoupdate.role='user';
      }
      const result = await usersService.updateUser(uid,usertoupdate);
      return res.send({ status: "success", payload: result });
    } catch (error) {
    // req.logger.debug(error.message); 
      console.log(error);
    }
  };


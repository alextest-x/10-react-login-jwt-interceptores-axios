import usersApi from "../apis/usersApi";

// se comenta porque se crea un interceptor en axios 
//ponemos la ruta en userApis
//const BASE_URL = 'http://localhost:8080/users';
const BASE_URL = '';

/*
// se comenta porque se creo un interceptor en userApis donde esta la 
//BASE_URL
//comentamos el metodo config() como tercer argumento donde es llamado

const config = () => { 
    return {
      headers: {
         //"Authorization": sessionStorage.getItem('item'),
          "Authorization": sessionStorage.getItem('token'),
         "Content-Type": "application/json",
       }
    }
}
*/

    
export const findAll = async () => {

    try {
        //cambiamos axios por userApi
        //const response = await axios.get(BASE_URL);
        const response = await usersApi.get(BASE_URL);
        return response;

    } catch (error) {
       console.error(error);
       throw error;
    }


}


export const save = async ({ username, email, password, admin }) => {

    try {
        //cambiamos axios por userApi porque la pusimos en userApis
        //return await axios.post(BASE_URL, {username, email, password, admin,});
        return await usersApi.post(BASE_URL, {username, email, password, admin,});
        //}, config()); //comentamos porque pusimos el interceptor 
    } catch (error) {
          throw error;
    }

}



export const update = async({ id, username, email, admin }) => {
    try {
        //pasamo el id y el objeto { username, email} en el segundo argumento
        //cambiamos axios por userApi 
        //return await axios.put(`${BASE_URL}/${id}`, {
        return await usersApi.put(`${BASE_URL}/${id}`, {
             username, 
             email,
             admin,
            //password, 
            // }, config()); //comentamos porque pusimos el interceptor 
            });
            
             //se pone password porque para que no haya error en la actualizacion 
             //porque nos pide poner el password pero este solo lo valida en backend
             //en el controlador al actualizar al usuario pero el que hace la logica
             //es el userServiceImpljava ahi no validad el password
             //no viaja desde front para que no se vea 
             //solo ponemos en password un valor que no dice nada
            
             //lo comentamos porque lo validamos en el backend de otra forma
             //password: 'nothing'
            //});
        
    } catch (error) {
        //console.error(error);
        throw error;
    }

}




export const remove = async (id) => {
    try {
        //await axios.delete(`${BASE_URL}/${id}`, config());
        //await axios.delete(`${BASE_URL}/${id}`); 
        await usersApi.delete(`${BASE_URL}/${id}`);
        
    } catch (error) {
        //console.error(error);
        throw error;
    }

}
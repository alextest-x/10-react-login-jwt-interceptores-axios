import axios from "axios";



    //export const loginUser = (userLogin) => {
    //si es true retorna true pero si es false retorna un false
    //return ( username === 'admin' && password === '123') ? true: false;

    //el userlogin debe ir a buscar en la base de datos
    //optimizando
    // return ( userLogin.username === 'admin' && userLogin.password === '123') 

     //se comunica con la base de datos por medio de APIRest  al backend spring

     //desestructuramos el userLogin  username, password
     //con axios regresa un json
    export const loginUser = async ({username, password}) => {
        try {
              return await axios.post('http://localhost:8080/login', {
               username,
               password,
           });

    } catch (error) {
        throw error;

    }

}
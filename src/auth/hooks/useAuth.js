import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";


//12. ponemos el sessionStorage.setItem 
//esto es string lo convertimos a json
const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined,
}


export const useAuth = () => {

    //9. implementamos el Reducer que viene de loginReducer 
    //initialLogin es un objeto
    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    
    //usando el hook useNavigate()
    const navigate = useNavigate();

    //11. implementamos el handlerLogin(); que viene  de LoginPage

    //implementamos un login simulado
    //const handlerLogin = ({username, password}) => {

    const handlerLogin =async ({username, password}) => {

        //lo pasamos a authService
        // if( username === 'admin' && password === '123') {
        
        //llamamos la funcion del authService
        //const isLogin = loginUserService({username, password});

        //para direccionar a la la pagina de login 
        //const isLogin = loginUser ({ username, password });

        // ponemos el wait para recibir la respuesta y async en el metodo
        //lo pasamos al try 
        //const response = await loginUser ({ username, password });


       
        //si es true guarda el usuario porque es un booleano
        //if(isLogin){
        //lo cambiamos try porque va a leer de base de datos

        //en axios se encuentra en la data entoncestenemos el token 
        try{
           const response = await loginUser ({ username, password });
           const token = response.data.token;
           

           //obtenemos los claims para obtenre si es admin o usuario 
           //el window.atob descodifica el string de la encriptacion en base 64 que viene desde el backend
           const claims = JSON.parse(window.atob(token.split(".")[1]));

           //los claims retorna un json como string hay que convertirlo a un objecto
           //convertimos con JSON.parse()
           console.log(claims);

           //const user = {username: response.data.username}
           //el claims tiene el objeto username o con sub
           const user = {username: claims.sub}

           //const user = {username: 'admin'}

           dispatch({
               type: 'login',
               payload: {user, isAdmin: claims.isAdmin},
           });
           



           //convertimo a un json
           sessionStorage.setItem('login', JSON.stringify({
               isAuth: true,
               isAdmin: claims.isAdmin,
               user,
           }));
        // guadamos el token en el storage
           sessionStorage.setItem('token', `Bearer ${token}`);
           navigate('/users');

        //} else {
        } catch (error) {
            if (error.response?.status== 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
                
            } else if(error.response?.status ==403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos', 'error');
            }else {
                throw error;
            }

       }
    }
  

//borra la sesion 
const handlerLogout = () => {
   dispatch({
       type: 'logout',
   });
   sessionStorage.removeItem('token');
   sessionStorage.removeItem('login');
   sessionStorage.clear();
}
return {

    //regresamos en el return lo que ocupamos en el useAuth y que viene del UsersApp
     login,
     handlerLogin,
     handlerLogout,
   }
}
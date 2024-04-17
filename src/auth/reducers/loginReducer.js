
//8. hacemos el reducer y lo implementamos en el UsersApp
//state es un objeto
export const loginReducer = ( state = {}, action) => {

    switch (action.type) {
      case 'login':
        
        //retorna un objeto los datos del usaurio  action.payload
        return {
            isAuth: true,
            isAdmin: action.payload.isAdmin,
            user: action.payload.user,
        };

      case 'logout':
        return{
            isAuth:false,
            isAdmin:false,
            user: undefined,
        };

      default:
        return state;
    }

}
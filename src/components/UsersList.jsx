import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { UserContext } from "../context/UserContext";
import { UserRow } from "./UserRow";

//export const UsersList = ( {handlerUserSelectedForm, handlerRemoveUser,  users=[] })=> {
export const UsersList = () => {
    const { users } = useContext(UserContext);
     //const countUser= users.length ;
     
     const { login } = useContext(AuthContext);
    return (

       
    <table className="table table-hover table-striped"> 
              
        <thead> 
            <tr>
                <th> id </th>
                <th> username </th>
                <th> email  </th>
                
                {!login.isAdmin || <>
                   <th> update </th>
                   <th> update route  </th>
                   <th> remove </th>
                </>}
            </tr>
        
        </thead>

        <tbody>
                {

                  
                      users.map(( {id, username, email, admin /*password */ }) => (    

                    <UserRow 
                        key={id} 
                        id={id}
                        username={username}
                        email={email} 
                        admin={admin}
                        //isAdmin = {admin === true? 'Administrador' : 'Usuario'} //test
                        />

                        /*password={password}*/
                        //handlerRemoveUser={ handlerRemoveUser }
                        //handlerUserSelectedForm = { handlerUserSelectedForm }  />
                      
                    
                    ))
                }
        </tbody>

    </table>

    )
}
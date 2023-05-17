import { gql } from '@apollo/client';

export const GET_USER_LIST =(id:string|undefined)=>{
   return  gql
    ` query 
    {
      UserDetails(_id:"${id}"){
          name,
          email
        }
      }`
    }

    export const GET_USER_LIST_WITH_PASSWORD =(id:string|undefined )=>{
       return  gql
        ` query 
        {
          UserDetails(_id:"${id}"){
              name,
              email,
              password
            }
          }`
        }

      export const GET_ALL_USER=gql`
      query{
        AllUserDetails{
            _id,
            email,
            name
        }
      }
      `




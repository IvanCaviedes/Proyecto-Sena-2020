import React from 'react'
import { Route, Redirect } from 'react-router-dom';
const isauth = () => {
    if (localStorage.getItem('token') !== null) {
        return true
    }
    return false
}
const privateroute = ({ component: Component, ...rest })=>{
    return (
        <Route 
        {...rest}
        render = {props=>
            isauth()?(
                <Component {...props}/>
            ):(
                <Redirect
                to={{
                    pathname:'/',
                    state: {mensaje:'Usuario no autorizado'}
                }}
                />
            )}
        />
    )
}
export default privateroute;
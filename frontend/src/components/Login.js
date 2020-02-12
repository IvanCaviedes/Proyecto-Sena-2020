import React, { Component } from 'react'

export default class Login extends Component {
constructor(props){
    super(props)
    this.state = {
        mensaje:this.props.location.state?this.props.location.state.mensaje:'',
    }
}
iniciosesion = (e)=> {
    e.preventDefault()
    const data = {
        username:this.email,
        password: this.password
    }
    const EnvioDatos = {
        method:'POST',
        body:JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Origin':'http://localhost:4000',
            'Accept':'application/json'
        }),
    };
    fetch('http://localhost:4000/auth/login',EnvioDatos)
    .then(response =>{
        if(response.ok){
            return response.json()
        }
        throw new Error("Usuario No existe o Campo vacio")
    })
    .then(token =>{
         localStorage.setItem('token',token);
         this.props.history.push("/admin");
         return;

    })
    .catch(e=>{
        this.setState({mensaje: e.message})
    })
}

    render() {
        return (
            <div>
                <form>
        
                    <input type="text" id="inputEmail" placeholder="Email address" onChange = {e =>this.email = e.target.value}/>
                    <input type="password" id="inputPassword" placeholder="Password" onChange = {e =>this.password = e.target.value}/>
                    <button onClick = {this.iniciosesion}>Sign in</button>
                </form>

                {
                    this.state.mensaje !== ''?(
                    <h1>{this.state.mensaje}</h1>
                    ) :''
                }
            </div>
        )
    }
}

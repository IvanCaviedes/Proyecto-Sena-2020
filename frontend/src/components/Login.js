import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Navlog from './docs/menulogreg'
import Header from './docs/headerlogreg'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mensaje: this.props.location.state ? this.props.location.state.mensaje : '',
        }
    }
    iniciosesion = (e) => {
        e.preventDefault()
        const data = {
            username: this.email,
            password: this.password
        }
        const EnvioDatos = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/auth/login', EnvioDatos)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Usuario No existe o Campo vacio")
            })
            .then(token => {
                localStorage.setItem('token', token);
                this.props.history.push("/admin");
                return;

            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    render() {
        return (
            <div className="bg-default">
            <div className="main-content">
                <Navlog />
                <Header />
                {/*  <a href="./cliente/html/Cliente.html">ircion</a>   */}
                <div class="container mt--8 pb-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center mb-4">
                                        <h3>Iniciar sesión</h3>
                                    </div>
                                    {
                                        this.state.mensaje !== '' ? (
                                            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                            <strong>Erorr!</strong> {this.state.mensaje}.
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            
                                        </div>
                                        ) : ''
                                    }
                                    <form role="form">
                                        <div class="form-group mb-5">
                                            <div class="input-group input-group-alternative">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                </div>
                                                <input class="form-control" placeholder="UserName" type="text" onChange={e => this.email = e.target.value} />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group input-group-alternative">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input class="form-control" placeholder="Contraseña" type="password" onChange={e => this.password = e.target.value} />
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-primary my-4" onClick={this.iniciosesion} >Iniciar sesión</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-4">
                                    <a href="#" class="text-light"><small>¿Olvido su clave?</small></a>
                                </div>
                                <div class="col-5">
                                    <a download="terminos y condiciones" href="url_del_fichero" class="text-light"><small>Terminos y condiciones</small></a>
                                </div>
                                <div class="col-3 text-right">
                                    <Link to="/register" class="text-light"><small>Crear cuenta</small></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

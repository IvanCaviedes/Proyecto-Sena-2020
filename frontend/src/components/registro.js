import React, { Component } from 'react'

import NavReg from './docs/menulogreg'
import Header from './docs/headerlogreg'

export default class registro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoing: true,
            mensaje: this.props.location.state ? this.props.location.state.mensaje : '',
        }
    }
    registrar = (e) => {
        e.preventDefault()
            const data = {
                name: this.name,
                username: this.username,
                password: this.password,
                email: this.email
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
        fetch('http://localhost:4000/user/register', EnvioDatos)
            .then(response => {
                if (response.ok) {
                    return response.ok
                }
                throw new Error("Verifique sus datos")
            })
            .then(token => {
                this.setState({ mensaje: "Registro correctamente" })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }
    render() {
        return (
            <div className="bg-default" style={{ height: "669px" }}>
                <div className="main-content">
                    <NavReg />
                    <Header />
                    <div class="container mt--8 pb-5">
                        <div class="row justify-content-center">
                            <div class="col-lg-10 col-md-8">
                                <div class="card bg-secondary shadow border-0">
                                    <div class="card-body px-lg-5 py-lg-5">
                                        <div class="text-center mb-1">
                                            <h2>Registrarse</h2><br /><p></p>
                                        </div>
                                        {
                                            this.state.mensaje !== '' ? (
                                                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                                    <strong>Mensaje!</strong> {this.state.mensaje}.
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>

                                                </div>
                                            ) : ''
                                        }
                                        <form role="form">
                                            <div class="row">
                                                <div class="form-group mb-2 col-6">
                                                    <div class="input-group input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="ni ni-satisfied"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Nombre" type="text" onChange={e => this.name = e.target.value} />
                                                    </div>
                                                </div>
                                                <div class="form-group col-6">
                                                    <div class="input-group input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="ni ni-single-02"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Nombre de usuario" type="text" onChange={e => this.username = e.target.value} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group mb-2 col-6">
                                                    <div class="input-group input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Contraseña" type="password" onChange={e => this.password = e.target.value} />
                                                    </div>
                                                </div>
                                                <div class="form-group mb-1 col-6">
                                                    <div class="input-group input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Correo" type="mail" onChange={e => this.email = e.target.value} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <input type="checkbox" checked={this.state.isGoing} aria-label="Checkbox for following text input" />
                                                    </div>
                                                </div>
                                                <a download="terminos y condiciones" href="https://drive.google.com/open?id=0BwQmE_aYXKDWcVJrdzB1OVJKcjQtOW5KUnNRSVFGeU1ncDln" class="input-group-text text-primary"><small> Terminos y condiciones</small></a>
                                            </div>
                                            <div class="text-center">
                                                <button type="button" class="btn btn-primary my-4" onClick={this.registrar} >Registrar</button>
                                            </div>
                                        </form>
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

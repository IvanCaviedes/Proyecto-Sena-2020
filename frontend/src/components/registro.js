import React, { Component } from 'react'

import NavReg from './docs/menulogreg'
import Header from './docs/headerlogreg'

export default class registro extends Component {
    render() {
        return (
            <div className="main-content">
                <NavReg />
                <Header />
                <div class="container mt--8 pb-5">
                    <div class="row justify-content-center">
                        <div class="col-lg-10 col-md-7">
                            <div class="card bg-secondary shadow border-0">
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center mb-4">
                                        <h3>Iniciar sesión</h3>
                                    </div>
                                    {/*  {
                                        this.state.mensaje !== '' ? (
                                            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                            <strong>Erorr!</strong> {this.state.mensaje}.
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                            
                                        </div>
                                        ) : ''
                                    } */}
                                    <form role="form">
                                        <div class="row">
                                            <div class="form-group mb-3 col-6">
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
                                                    <input class="form-control" placeholder="Nombre de suario" type="text" onChange={e => this.username = e.target.value} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="form-group mb-3 col-6">
                                                <div class="input-group input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Contraseña" type="password" onChange={e => this.password = e.target.value} />
                                                </div>
                                            </div>
                                            <div class="form-group mb-3 col-6">
                                                <div class="input-group input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Correo" type="mail" onChange={e => this.email = e.target.value} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="input-group mb-1">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <input type="checkbox" aria-label="Checkbox for following text input" />
                                                </div>
                                            </div>
                                            <a download="terminos y condiciones" href="https://drive.google.com/drive/u/0/my-drive" class="input-group-text text-primary"><small> Terminos y condiciones</small></a>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-primary my-4" onClick={this.iniciosesion} >Iniciar sesión</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

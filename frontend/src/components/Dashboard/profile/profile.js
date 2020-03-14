import React, { Component } from 'react'
import Footer from '../Footer'
export default class profile extends Component {
    render() {
        return (
            <div>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKsQ3XySgrtG1yPWAfelaxYj97ek5rFerG3mxWM6fQoB_ocGTc)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-5s col-md-5">
                                <h1 class="display-2 text-white">¡Hola! {JSON.parse(localStorage.getItem('datos')).name ? JSON.parse(localStorage.getItem('datos')).name : 'sin usuario'}</h1>
                                <p class="text-white mt-0 mb-5">Este es tu perfil. Mantenlo atualizada tu información personal. En esta pagina puedes editar tu perfil, asi como agregar números de telefono, direciones y correos</p>
                                <a href="#!" class="btn btn-info">Editar perfil</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mt--7">
                    <div class="row">
                        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                            <div class="card card-profile shadow">
                                <div class="row justify-content-center">
                                    <div class="col-lg-3 order-lg-2">
                                        <div class="card-profile-image">
                                            <a href="#">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKsQ3XySgrtG1yPWAfelaxYj97ek5rFerG3mxWM6fQoB_ocGTc" class="rounded-circle" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div class="d-flex justify-content-between">
                                        <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                                        <a href="#" class="btn btn-sm btn-default float-right">Message</a>
                                    </div>
                                </div>
                                <div class="card-body pt-0 pt-md-4">
                                    <div class="row">
                                        <div class="col">
                                            <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <span class="heading">22</span>
                                                    <span class="description">Friends</span>
                                                </div>
                                                <div>
                                                    <span class="heading">10</span>
                                                    <span class="description">Photos</span>
                                                </div>
                                                <div>
                                                    <span class="heading">89</span>
                                                    <span class="description">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <h3>
                                            Jessica Jones<span class="font-weight-light">, 27</span>
                                        </h3>
                                        <div class="h5 font-weight-300">
                                            <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
                                        <div class="h5 mt-4">
                                            <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div>
                                        <div>
                                            <i class="ni education_hat mr-2"></i>University of Computer Science
                </div>
                                        <hr class="my-4" />
                                        <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                                        <a href="#">Show more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Mu cuenta</h3>
                                        </div>
                                        <div class="col-4 text-right">
                                            <a href="#!" class="btn btn-sm btn-primary">Ajustes</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <h6 class="heading-small text-muted mb-4">información del usuarío</h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Nombre de usuarío</label>
                                                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="username" value="pepe.back" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-email">Correo electronico</label>
                                                        <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="correo@ejemplo.com" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-first-name">Nombres</label>
                                                        <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="First name" value="Pepe" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">Apellidos</label>
                                                        <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Last name" value="Segundo" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-nacimiento">Fecha de nacimiento</label>
                                                        <input type="date" id="input-nacimiento" class="form-control form-control-alternative" placeholder="nacimiento" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />

                                        <h6 class="heading-small text-muted mb-4">informacion adicional</h6>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-address">Dirección</label>
                                                        <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" value="Calle falsa 123" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-city">Ciudad</label>
                                                        <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" value="Bogotá" />
                                                    </div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-country">País</label>
                                                        <input type="text" id="input-country" class="form-control form-control-alternative" placeholder="Country" value="Colombía" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />

                                        <h6 class="heading-small text-muted mb-4">About me</h6>
                                        <div class="pl-lg-4">
                                            <div class="form-group">
                                                <label>Descripción</label>
                                                <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">soy un desarrollador backend.</textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
                </div>
            </div>
        )
    }
}
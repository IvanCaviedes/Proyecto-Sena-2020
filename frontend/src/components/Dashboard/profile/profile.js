import React, { Component } from 'react'
import Footer from '../Footer'
export default class profile extends Component {

    actualizar2 = (e) => {
        const id_d = JSON.parse(localStorage.getItem('datos')).id
        e.preventDefault();
        const datos = {
            name: this.name
        }
        const envio = {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'https://veterinariapetshop.herokuapp.com/',
                'Accept': 'application/json'
            }),
        };
        fetch(`https://veterinariapetshop.herokuapp.com/user/_id/${id_d}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "Usuario no actualizado" })
                this.setState({ datoserror: { icon: 'times', color: 'danger' } })
                this.toggleModal('notificationModal')
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ mensaje: "Usuario actualizado" })
                this.listar()
                this.setState({ datoserror: { icon: 'bell', color: 'warning' } })
                this.toggleModal('notificationModal')
                return;
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <div>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(https://ehorus.com/wp-content/uploads/2018/05/director-de-transformacion-digital-featured.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-12 col-md-1">
                                <h1 class="display-2 text-white">¡Hola! {JSON.parse(localStorage.getItem('datos')).name ? JSON.parse(localStorage.getItem('datos')).name : 'sin usuario'}</h1>
                                <h3 class="display-4 text-white"> Estas en la sección de perfil de usuarios</h3>
                                <p class="text-white mt-0 mb-5"></p>
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
                                    <div class="d-flex justify-content-center">
                                        <a href="#" class="btn btn-sm btn-default m-4 ">Cambiar imagen</a>
                                    </div>
                                </div>
                                <div class="card-body pt-0 pt-md-0">
                                    <div class="text-center">
                                        <h3>
                                            {JSON.parse(localStorage.getItem('datos')).name ? JSON.parse(localStorage.getItem('datos')).name : 'sin usuario'}<span class="font-weight-light"></span>
                                        </h3>
                                        <div class="h5 font-weight-300">
                                            <i class="ni location_pin mr-2"></i>{JSON.parse(localStorage.getItem('datos')).name ? JSON.parse(localStorage.getItem('datos')).email : 'sin correo'}
                                        </div>

                                        <hr class="my-4" />
                                        <p>Este es tu perfil. Manten atualizada tu información personal. En esta pagina puedes editar tu perfil, asi como agregar números de telefono, direciones y correos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Tu cuenta</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row align-items-center">
                                            <div class="col-8">
                                                <h6 class="heading-small text-muted mb-4">Informacion del usuario</h6>
                                            </div>
                                            <div class="col-4 text-right">
                                                <button type="submit" class="btn btn-sm btn-primary">Agregar</button>
                                            </div>
                                        </div>

                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Nombre de usuarío</label>
                                                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder={JSON.parse(localStorage.getItem('datos')).name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}
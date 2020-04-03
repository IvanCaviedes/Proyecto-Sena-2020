import React, { Component } from 'react'
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Alert
} from "reactstrap";

export default class CambioContra extends Component {

    constructor() {
        super()
        this.state = {
            datosU: {},
            defaultModal: false,
            datoserror: {},
            mensaje: ''
        }
    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    validarCodigo = (e) => {
        e.preventDefault();
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'https://veterinariapetshop.herokuapp.com/',
                'Accept': 'application/json'
            }),
        };
        fetch(`https://veterinariapetshop.herokuapp.com/user/email/${this.email}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Codigo erroneo')
            })
            .then(token => {
                if (token.users[0].password === this.codigo) {
                    this.setState({ datosU: token.users[0] })
                    this.actualizar()
                }
                else {
                    alert('codigo erroneo')
                }
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    actualizar = (e) => {
        this.toggleModal('formModal2')
    }
    actualizar2 = (e) => {
        e.preventDefault();
        const datos = {
            password:this.Nueva
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
        fetch(`https://veterinariapetshop.herokuapp.com/user/_id/${this.state.datosU._id}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no Actualizado')
            })
            .then(token => {
                this.setState({ mensaje: "Su contraseña se ha actualizado correctamente" })
                this.setState({ datoserror: { icon: 'bell-55', color: 'primary' } })
                this.toggleModal('notificationModal')
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })

    }

    render() {
        return (
            <div>
                <div className="bg-default">
                    {/* Navbar */}
                    <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                        <div class="container">
                            <a class="navbar-brand" href="dashboard.html">
                                <img src="../assets/img/brand/white.png" />
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
                                <div class="navbar-collapse-header">
                                    <div class="row">
                                        <div class="col-6 collapse-brand">
                                            <a href="dashboard.html">
                                                <img src="../assets/img/brand/blue.png" />
                                            </a>
                                        </div>
                                        <div class="col-6 collapse-close">
                                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                                <span></span>
                                                <span></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <hr class="d-lg-none" /> */}
                            </div>
                        </div>
                    </nav>
                    <div class="main-content">
                        {/*  Header */}
                        <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                            <div class="container">
                                <div class="header-body text-center mb-7">
                                    <div class="row justify-content-center">
                                        <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                            <h1 class="text-white">Recuperar Contraseña!</h1>
                                            <p class="text-lead text-white">Digite el codigo que le llego al correo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="separator separator-bottom separator-skew zindex-100">
                                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                                </svg>
                            </div>
                        </div>
                        {/* Page content */}
                        <div class="container mt--8 pb-5">
                            <div class="row justify-content-center">
                                <div class="col-lg-5 col-md-7">
                                    <div class="card bg-secondary border-0 mb-0">
                                        <div class="card-body px-lg-5 py-lg-5">
                                            <div class="text-center text-muted mb-4">
                                                <small>Tu Email y tu codigo Aqui!</small>
                                            </div>
                                            <form role="form" onSubmit={this.validarCodigo}>
                                                <div class="form-group mb-3">
                                                    <div class="input-group input-group-merge input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Email" type="email" onChange={e => this.email = e.target.value} required />
                                                    </div>
                                                </div>
                                                <div class="form-group mb-3">
                                                    <div class="input-group input-group-merge input-group-alternative">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                                        </div>
                                                        <input class="form-control" placeholder="Codigo" type="password" onChange={e => this.codigo = e.target.value} required />
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <button type="submit" class="btn btn-primary my-4">Validar Codigo</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="py-5" id="footer-main">
                        <div class="container">
                            <div class="row align-items-center justify-content-xl-between">
                                <div class="col-xl-6">
                                    <div class="copyright text-center text-xl-left text-muted">
                                        &copy; 2020 <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Creative Tim</a>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                                        <li class="nav-item">
                                            <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Creative Tim</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank">About Us</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" class="nav-link" target="_blank">MIT License</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={this.state.formModal2}
                    toggle={() => this.toggleModal("formModal2")}
                    backdrop="static"
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Cambiar contraseña?</h2>
                                    <p>Digita tu nueva contraseña!</p>
                                </div>
                                <Form role="form" onSubmit = {this.actualizar2}>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i class="fas fa-phone"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Contraseña Nueva" type="text" onChange={e => this.Nueva = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Recuperar
                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>

                <Modal
                    className={`modal-dialog-centered modal-${this.state.datoserror.color}`}
                    contentClassName={`bg-${this.state.datoserror.color}`}
                    isOpen={this.state.notificationModal}
                    toggle={() => this.toggleModal("notificationModal")}
                >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal")}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className={`ni ni-${this.state.datoserror.icon} ni-5x`} />
                            <h4 className="heading mt-4">Bien!</h4>
                            <p>
                                {this.state.mensaje}
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.props.history.push('/')}
                        >
                            Close
                </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

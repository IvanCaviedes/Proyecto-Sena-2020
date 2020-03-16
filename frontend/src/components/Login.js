import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    Modal
} from "reactstrap";

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mensaje: this.props.location.state ? this.props.location.state.mensaje : '',
            defaultModal: false,
            datoserror: {},
            backdrop: true,
            keyboard: true
        }
    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };


    componentDidMount() {
        if (localStorage.getItem('token')) {
            localStorage.clear()
            this.setState({ mensaje: "su sesion a caducado por favor inicie sesion" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'primary' } })
            this.toggleModal('notificationModal')
        }
        this.comprobar()

    }

    comprobar = (e) => {
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/user/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no existe')
            })
            .then(token => {
                if (token.message === 'NO CONTENT') {
                    this.toggleModal('formModal3')
                }
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    primero = (e) => {
        e.preventDefault();
        const datos = {
            password: this.password,
            email: this.email,
            username: this.username,
            name: this.name,
            role: 'admin'
        }
        const envio = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/user/register', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "Usuario no creado" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.props.history.push('/admin');
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })

    }

    iniciosesion = (e) => {
        e.preventDefault();
        const data = {
            username: this.username,
            password: this.password
        }
        const envio = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/auth/login', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "Usuario no existe" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
                throw new Error('Usuario no existe')
            })
            .then(token => {
                if (token.message === 'PASSWORD INCORRECTA') {
                    this.setState({ mensaje: "Pasword incorrecta" })
                    this.setState({ datoserror: { icon: 'bell-55', color: 'warning' } })
                    this.toggleModal('notificationModal')
                } else {
                    localStorage.setItem('token', token.token);
                    localStorage.setItem('datos', JSON.stringify(token.payload))
                    this.props.history.push('/admin');
                }
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    recuperar = (e) => {
        e.preventDefault();
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };

        fetch(`http://localhost:4000/user/username/${this.username}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "Si digitaste bien el usuario te llegara un codigo al correo" })
                this.setState({ datoserror: { icon: 'bell-55', color: 'primary' } })
                this.toggleModal('notificationModal')
                throw new Error('Si digitaste bien el usuario te llegara un codigo al correo')
            })
            .then(token => {
                this.envio();
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    envio = (e) => {
        const datos = {
            username: this.username
        }
        const envio = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/correos/recuperar', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error')
            })
            .then(token => {
                this.setState({ mensaje: "Si digitaste bien el usuario te llegara un codigo al correo" })
                this.setState({ datoserror: { icon: 'bell-55', color: 'primary' } })
                this.toggleModal('notificationModal')
                return;
            })
            .catch(e => {
                console.log(e)
            })
    }
    registrar = (e) => {
        e.preventDefault();
        const datos = {
            username: this.username,
            email: this.email,
            name: this.name
        }
        const envio = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch('http://localhost:4000/correos/registrar', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Error')
            })
            .then(token => {
                this.setState({ mensaje: "Tus datos los tendra el adminstrador te llegara un correo si te crearon la cuenta con exito" })
                this.setState({ datoserror: { icon: 'bell-55', color: 'primary' } })
                this.toggleModal('notificationModal')
                return;
            })
            .catch(e => {
                console.log(e)
            })
    }
    render() {
        return (
            <div className="bg-default">
                {/* Navbar */}
                <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="dashboard.html">
                            <img class="h-40 " src="https://i.imgur.com/B8YoPhk.png" />
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
                            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                                <li class="nav-item d-lg-block ml-lg-2">
                                    <Link to="/cliente" class="btn btn-icon text-white bg-default">
                                        <span class="btn-inner--icon">
                                            <i class="fas fa-user-tag mr-2 "></i>
                                        </span>
                                        <span class="nav-link-inner--text">Clientes</span>
                                    </Link>
                                    <a href="http://localhost:4000/index" class="btn btn-neutral btn-icon">
                                        <span class="btn-inner--icon">
                                            <i class="fas fa-home mr-2"></i>
                                        </span>
                                        <span class="nav-link-inner--text">Pagina Principal</span>
                                    </a>
                                </li>
                            </ul>
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
                                        <h1 class="text-white">Welcome!</h1>
                                        <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
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
                                            <small>Or sign in with credentials</small>
                                        </div>
                                        <form role="form" onSubmit={this.iniciosesion}>
                                        <div class="form-group mb-3">
                                        <div class="input-group input-group-merge input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Email" type="text" onChange={e => this.username = e.target.value} required />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                            <div class="input-group input-group-merge input-group-alternative">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input class="form-control" placeholder="Password" type="password" onChange={e => this.password = e.target.value} required />
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <button type="submit" class="btn btn-primary my-4">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <a href="#" class="text-light" onClick={() => {
                                            if (window.navigator.onLine) {
                                                this.toggleModal("formModal");
                                            }
                                            else {
                                                this.setState({ mensaje: "Debes tener internet" })
                                                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                                                this.toggleModal('notificationModal')
                                            }
                                        }}><small>Forgot password?</small></a>
                                    </div>
                                    <div class="col-6 text-right">
                                        <a href="#" class="text-light" onClick={() => {
                                            if (window.navigator.onLine) {
                                                this.toggleModal("formModal2")
                                            }
                                            else {
                                                this.setState({ mensaje: "Debes tener internet" })
                                                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                                                this.toggleModal('notificationModal')
                                            }
                                        }}><small>Create new account</small></a>
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
                            <h4 className="heading mt-4">Alerta</h4>
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
                            onClick={() => this.toggleModal("notificationModal")}
                        >
                            Close
                </Button>
                    </div>
                </Modal>

                <Modal
                    className="modal-dialog-centered"
                    data-backdrop="static"
                    size="sm"
                    isOpen={this.state.formModal}
                    toggle={() => this.toggleModal("formModal")}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Olvidaste tu contraseña?</h2>
                                    <p>ingresa tu nombre de usuario y enviaremos tu contraseña al correo electronico</p>
                                </div>
                                <Form role="form" onSubmit={this.recuperar}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-circle-08" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Usuario" type="text" onChange={e => this.username = e.target.value} required />
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
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={this.state.formModal2}
                    toggle={() => this.toggleModal("formModal2")}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Deseas solicitar cuenta ?</h2>
                                    <p>Danos tus datos y despues de un tiempo obtendras respuesta al correo</p>
                                </div>
                                <Form role="form" onSubmit={this.registrar}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Nombre Completo" type="text" onChange={e => this.name = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" onChange={e => this.email = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i class="fas fa-phone"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Username" type="text" onChange={e => this.username = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Enviar Peticion
                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>

                <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    backdrop="static"
                    isOpen={this.state.formModal3}
                    toggle={() => this.toggleModal("formModal3")}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Bienvenido eres el Primer Usuario</h2>
                                    <p>Danos tus datos y te daremos acceso a la Plataforma</p>
                                </div>
                                <Form role="form" onSubmit={this.primero}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="username" type="text" onChange={e => this.username = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" onChange={e => this.email = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i class="fas fa-phone"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="password" type="text" onChange={e => this.password = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i class="fas fa-phone"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="nombre completo" type="text" onChange={e => this.name = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Enviar Peticion
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
                            <h4 className="heading mt-4">Alerta</h4>
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
                            onClick={() => this.toggleModal("notificationModal")}
                        >
                            Close
                </Button>
                    </div>
                </Modal>


            </div>
        )
    }
}

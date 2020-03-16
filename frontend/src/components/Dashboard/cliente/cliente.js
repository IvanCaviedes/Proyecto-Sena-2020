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
    Modal
} from "reactstrap";
import Footer from '../Footer'
export default class cliente extends Component {

    constructor() {
        super()
        this.state = {
            Tusuarios: [],
            defaultModal: false,
            datoserror: {},
            usuario: {},
            mensaje: '',
            borrar: '',
            admins: ''
        }
    }

    componentDidMount() {

        this.listar()
        this.CuasntosAdmin()
    }
    eliminarusuario(id) {
        const idlog = JSON.parse(localStorage.getItem('datos')).id
        if (window.confirm('Estas seguro de eliminar este usuario?')) {
            if (id === idlog) {
                this.setState({ mensaje: "No te puedes eliminar a ti mismo" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
            }
            else {
                const envio = {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:4000',
                        'Accept': 'application/json'
                    }),
                };
                fetch(`http://localhost:4000/user/_id/${id}`, envio)
                    .then(alert('usuario eliminado'), this.listar(), this.CuasntosAdmin())
                    .catch(e => console.log(e))
            }
        }
    }
    ActualizarUsuario = (id) => {
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch(`http://localhost:4000/user/_id/${id}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no existe')
            })
            .then(token => {
                this.setState({ usuario: token.users[0] })
                this.toggleModal('formModal2')
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    listar = (e) => {
        const token12 = localStorage.getItem('token')
        const envio = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": '*',
                'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
                'Authorization': `${token12}`
            }
        };
        fetch('http://localhost:4000/prod/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ Tusuarios: token.users })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };


    consultas = (e) => {
        e.preventDefault();
        let opcion;
        if (this.opcionbusqueda === undefined) {
            this.setState({ mensaje: "Añade el tipo de dato de la busqueda por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        }
        else {
            switch (this.opcionbusqueda) {
                case 'Nombre':
                    opcion = 'name'
                    break;
                case 'Correo':
                    opcion = 'email'
                    break;
                case 'Nombre':
                    opcion = 'name'
                    break;
                case 'Username':
                    opcion = 'username'
                    break;
                case 'Rol':
                    opcion = 'role'
                    break;
                default:
                    opcion = ''
                    break;
            }
        }
        const envio = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": '*',
                'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
            }
        };
        fetch(`http://localhost:4000/user/${opcion}/${this.cajatexto}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ Tusuarios: token.users })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }
    mostartodo = (e) => {
        e.preventDefault();
        this.listar();
    }

    CuasntosAdmin = (e) => {
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch(`http://localhost:4000/user/role/admin`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no existe')
            })
            .then(token => {
                if (token.message) {
                    this.setState({ admins: 'false' })
                }
                else {
                    if (token.users.length >= 3) {
                        this.setState({ admins: 'true' })
                    }
                    else {
                        this.setState({ admins: 'false' })
                    }
                }
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })


    }
    UserNew = (e) => {
        e.preventDefault();
        if (this.rol === undefined) {
            this.setState({ mensaje: "Añade un rol por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        } else {
            if (window.navigator.onLine) {
                if (this.state.admins === 'true' && this.rol === 'admin') {
                    this.setState({ mensaje: "No pueden haber mas de 3 administradores" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModal')
                }
                else {
                    const token12 = localStorage.getItem('token')
                    const datos = {
                        password: this.username,
                        email: this.email,
                        username: this.username,
                        name: this.name,
                        role: this.rol
                    }
                    const envio = {
                        method: 'POST',
                        body: JSON.stringify(datos),
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Origin': 'http://localhost:4000',
                            'Accept': 'application/json',
                            'Authorization': `${token12}`
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
                            this.setState({ mensaje: "Usuario creado" })
                            this.listar()
                            this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                            this.toggleModal('notificationModal')
                            this.CuasntosAdmin()
                            return;
                        })
                        .catch(e => {
                            this.setState({ mensaje: e.message })
                        })
                }
            }
            else {
                this.setState({ mensaje: "Debes tener internet para hacer esta lavor" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
            }
        }
    }
    actualizar2 = (e) => {
        const id_d = this.state.usuario._id;
        e.preventDefault();
        if (this.rol === undefined) {
            this.setState({ mensaje: "Añade un rol por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        } else {
            const datos = {
                email: this.email,
                name: this.name,
                role: this.rol
            }
            const envio = {
                method: 'PUT',
                body: JSON.stringify(datos),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:4000',
                    'Accept': 'application/json'
                }),
            };
            fetch(`http://localhost:4000/user/_id/${id_d}`, envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    this.setState({ mensaje: "Usuario no actualizado" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModal')
                    throw new Error('Usuario no creado')
                })
                .then(token => {
                    this.setState({ mensaje: "Usuario actualizado" })
                    this.listar()
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                    this.toggleModal('notificationModal')
                    return;
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
    render() {
        return (
            <div>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(http://localhost:4000/public/img/notocar/user.png)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask opacity-7" style={{ background: '#000' }}></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-12 col-md-10">
                                <h5 class="display-3 text-white">Estas en la sección de Cotizacion</h5>
                                <p class="text-white mt-0 mb-5">Podras crear, actualizar, editar o eliminar usuarios ¡¡TEN CUIDADO!!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mt--9">
                    <div class="row">
                        <div class="col-xl-4 order-xl-2 mb-0 mb-xl-0">
                            <div class="card" style={{ width: '30rem' }}>
                                <img src="data:image/png;base64,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" class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <form action="">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-first-name">Cantidad</label>
                                            <input type="number" id="input-first-name" class="form-control form-control-alternative" placeholder="Digite un valor" onChange={e => this.stock = e.target.value} required />
                                        </div>
                                        <a href="#" class="btn btn-primary btn-lg btn-block">Agregar</a>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Consultar Producto</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.consultas}>

                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <h6 class="heading-small text-muted mb-4">Dato a Consultar</h6>
                                            </div>
                                            <div class="col-6 text-right">
                                                <button type="submit" class="btn btn-sm btn-default btn-lg btn-block">Consultar</button>
                                            </div>
                                        </div>
                                        <div class="pl-lg-4 mt-4">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">Digita el tipo de dato</label>
                                                        <div class="form-group">
                                                            <select class="form-control form-control-alternative" id="exampleFormControlSelect1" onChange={e => this.opcionbusqueda = e.target.value} required>
                                                                <option>Seleccionar</option>
                                                                <option>Nombre</option>
                                                                <option>Correo</option>
                                                                <option>Username</option>
                                                                <option>Rol</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">Escribe el dato</label>
                                                        <div class="input-group input-group-merge input-group-alternative mb-0">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-search text-blue"></i></span>
                                                            </div>
                                                            <input class="form-control" placeholder="Search" type="text" onChange={e => this.cajatexto = e.target.value} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-xl-12 order-xl-2">
                                    <div class="card shadow">
                                        <div class="card-header border-0">
                                            <div class="row align-items-center">
                                                <div class="col-3">
                                                    <h3 class="mb-0">Productos</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table align-items-center table-flush">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Rol</th>
                                                        <th scope="col">Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/*                                             {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-primary" onClick={() => this.ActualizarUsuario(user._id)} ><i class="fas fa-user-edit"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.eliminarusuario(user._id)}><i class="fas fa-user-minus"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            } */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 order-xl-2 mx-auto">
                        <div class="card shadow">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col-3">
                                        <h3 class="mb-0">Productos Agregados</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table align-items-center table-flush">
                                    <thead class="thead-light">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Rol</th>
                                            <th scope="col">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/*                                             {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-primary" onClick={() => this.ActualizarUsuario(user._id)} ><i class="fas fa-user-edit"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.eliminarusuario(user._id)}><i class="fas fa-user-minus"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            } */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 order-xl-2 mx-auto">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <form onSubmit={this.mostartodo}>
                                        <div class="row align-items-center">
                                            <div class="col-5">
                                                <h3 class="mb-0">Generar cotizacion</h3>
                                            </div>
                                            <div class="col-7">
                                                <button type="submit" className="btn btn-default btn-lg btn-block">Mostrar Todos</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    <Footer />
                </div>
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
                            cerrar
                </Button>
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
                                    <h2>Actualizar usuario </h2>
                                    <p>Vas a actualizar los datos de <h4>{this.state.usuario.name}</h4></p>
                                </div>
                                <Form role="form" onSubmit={this.actualizar2}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" onChange={e => this.name = e.target.value} placeholder={this.state.usuario.name} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" onChange={e => this.email = e.target.value} placeholder={this.state.usuario.email} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" name="select" id="exampleSelect" onChange={e => this.rol = e.target.value} placeholder={this.state.usuario.role} required>
                                                <option>seleccionar</option>
                                                <option>admin</option>
                                                <option>regular</option>
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>


                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Actualizar
                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>

            </div>
        )
    }
}

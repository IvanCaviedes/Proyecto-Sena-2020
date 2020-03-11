import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
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
export default class users extends Component {
    constructor() {
        super()
        this.state = {
            Tusuarios: [],
            defaultModal: false,
            datoserror: {},
            usuario: {},
            mensaje: '',
            borrar: ''
        }
    }

    componentDidMount() {
        this.listar()
    }
    eliminarusuario(id) {
        if (window.confirm('¿Estas seguro de eliminar esta mascota?')) {
            const envio = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:4000',
                    'Accept': 'application/json'
                }),
            };
            fetch(`http://localhost:4000/proveedor/_id/${id}`, envio)
                .then(alert('Mascota eliminada'), this.listar())
                .catch(e => console.log(e))
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
        fetch(`http://localhost:4000/proveedor/_id/${id}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('mascota no existe')
            })
            .then(token => {
                this.setState({ usuario: token.Proveedor[0] })
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
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token12}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
            }),
        };
        console.log()
        fetch('http://localhost:4000/proveedor/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Mascota no creada')
            })
            .then(token => {
                this.setState({ Tusuarios: token.Proveedores})
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

    UserNew = (e) => {
        e.preventDefault();
        if (this.name === undefined) {
            this.setState({ mensaje: "Añade una especie por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        } else {
            const datos = {
                name: this.name,
                telefono: this.telefono,
                correo: this.correo
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
            fetch('http://localhost:4000/proveedor/register', envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    this.setState({ mensaje: "mascota no creada" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModal')
                    throw new Error('mascota no creada')
                })
                .then(token => {
                    this.setState({ mensaje: "mascota creada" })
                    this.listar()
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                    this.toggleModal('notificationModal')
                    return;
                })
                .catch(e => {
                    this.setState({ mensaje: e.message })
                })

        }
    }
    actualizar2 = (e) => {
        const id_d = this.state.usuario._id;
        e.preventDefault();
        if (this.name === undefined) {
            this.setState({ mensaje: "Añade una categoria por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        } else {
            const datos = {
                name: this.name,
                telefono: this.telefono,
                correo: this.correo               
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
            console.log(envio)
            fetch(`http://localhost:4000/proveedor/_id/${id_d}`, envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    this.setState({ mensaje: "mascota no actualizada" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModal')
                    throw new Error('mascota no creada')
                })
                .then(token => {
                    this.setState({ mensaje: "mascota actualizada" })
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
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(http://localhost:4000/public/img/notocar/producto.png)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-8 col-md-10">
                                <h5 class="display-3 text-white">Estas En la seccion de proveedores</h5>
                                <p class="text-white mt-0 mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum itaque tempore suscipit ipsa rem, dolorem atque corporis soluta facere ullam similique quidem eius quibusdam nobis, recusandae veniam. Totam, tempore ipsam!</p>
                                <Link class="nav-link" to="/admin"><i class="ni ni-tv-2 text-primary"></i> atras</ Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mt--9">
                    <div class="row">
                        <div class="col-xl-4 order-xl-2 mb-9 mb-xl-0">
                            <div class="card card-profile shadow">
                                <div class="card-body mt-4 pt-md-4">
                                    <div class="text-center">
                                        <h3>
                                            Lorem, ipsum dolor sit amet
                                        </h3>
                                        <div class="h5 font-weight-300">
                                            <i class="ni location_pin mr-2"></i>Lorem ipsum dolor
                    </div>
                                        <div class="h5 mt-4">
                                            <i class="ni business_briefcase-24 mr-2"></i>Lorem ipsum dolor
                    </div>
                                        <div>
                                            <i class="ni education_hat mr-2"></i>Lorem ipsum dolor
                    </div>
                                        <hr class="my-4" />
                                        <p>Lorem ipsum dolor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Agregar </h3>proveedor
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.UserNew}>

                                        <div class="row align-items-center">
                                            <div class="col-8">
                                                <h6 class="heading-small text-muted mb-4">Informacion del proveedor</h6>
                                            </div>
                                            <div class="col-4 text-right">
                                                <button type="submit" class="btn btn-sm btn-primary">Agregar</button>
                                            </div>
                                        </div>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Nombre proveedor</label>
                                                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Nombre" onChange={e => this.name = e.target.value} required />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-email">telefono proveedor</label>
                                                        <input type="text" id="input-email" class="form-control form-control-alternative" placeholder="12345" onChange={e => this.telefono = e.target.value} required />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-first-name">correo</label>
                                                        <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="correo@ejemplo.com" onChange={e => this.correo = e.target.value} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 order-xl-2">
                            <div class="card shadow">
                                <div class="card-header border-0">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h3 class="mb-0">Proveedores</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">telefono</th>
                                                <th scope="col">correo</th>
                                                <th scope="col">opcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.telefono}</td>
                                                            <td>{user.correo}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-primary" onClick={() => this.ActualizarUsuario(user._id)} ><i class="fas fa-user-edit"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.eliminarusuario(user._id)}><i class="fas fa-user-minus"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
                            Close
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
                                            <Input type="number" onChange={e => this.telefono = e.target.value} placeholder={this.state.usuario.telefono} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" onChange={e => this.correo = e.target.value} placeholder={this.state.usuario.correo} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" name="select" id="exampleSelect" onChange={e => this.categoria = e.target.value} placeholder={this.state.usuario.category} required>
                                                <option>Seleccionar</option>
                                                <option>Niños</option>
                                                <option>Hogar</option>
                                                <option>Entretenimiento</option>
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
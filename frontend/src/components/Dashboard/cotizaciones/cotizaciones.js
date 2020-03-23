import React, { Component } from 'react'
import moment from 'moment'
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
export default class cotizaciones extends Component {
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
        this.listar();
    }


    esamonda(productos){
        console.log(JSON.parse(productos))
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
        fetch('http://localhost:4000/cotizacion/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ Tusuarios: '' })
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ Tusuarios: token.Proveedores })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }
    render() {
        return (
            <div>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(http://localhost:4000/public/img/notocar/user.png)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-12 col-md-10">
                                <h5 class="display-3 text-white">Estas en la sección de Cotizaciones</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mt--9">
                    <div class="row">
                        <div class="col-xl-12 order-xl-2 mb-0 mb-xl-0">
                            <div class="card card-profile shadow">
                                <div class="card-body mt-4 pt-md-4">
                                    <div class="text-center">
                                        <h3>
                                            ¡¡TEN CUIDADO!!
                                    </h3>
                                        <div class="h5 mt-4">
                                            <i class="ni business_briefcase-24 mr-2"></i>En este modulo podras crear, actualizar, editar o eliminar usuarios. Asi como ver los usuarios ya creados o buscar uno en especifico.
                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12 order-xl-2">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Consultas</h3>
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
                            </div>
                        </div>


                        <div class="col-xl-6 order-xl-2 mx-auto">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <form onSubmit={this.mostartodo}>
                                        <div class="row align-items-center">
                                            <div class="col-5">
                                                <h3 class="mb-0">Mostrar Todos</h3>
                                            </div>
                                            <div class="col-7">
                                                <button type="submit" className="btn btn-default btn-lg btn-block">Mostrar Todos</button>
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
                                        <div class="col-3">
                                            <h3 class="mb-0">Cotizaciones Disponibles</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Id Cliente</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Cantidad de productos</th>
                                                <th scope="col">Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.Idcliente}</td>
                                                            <td>{moment(user.date).format('MMMM Do YYYY')}</td>
                                                            <td>#{JSON.parse(user.productos).length}
                                                            <button className="btn btn-sm btn-success ml-3" onClick={() => this.esamonda(user.productos)} ><i class="fas fa-eye"></i> Ver</button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-sm btn-success" onClick={() => this.ActualizarUsuario(user._id)} ><i class="fas fa-check-circle"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.eliminarusuario(user._id)}><i class="fas fa-times"></i></button>
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

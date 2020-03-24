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
            Tproductos: [],
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
        this.cotizacionesvencidas();
    }
    cotizacionesvencidas() {
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch(`http://localhost:4000/cotizacion/comprovar`, envio)
    }
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    esamonda(productos) {
        const total = JSON.parse(productos)
        this.setState({ Tproductos: total })
        this.toggleModal('formModal2')
    }

    Eliminarcotizacion(id) {
        if (window.confirm('Estas seguro de eliminar esta cotizacion?')) {
            const envio = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:4000',
                    'Accept': 'application/json'
                }),
            };
            fetch(`http://localhost:4000/cotizacion/_id/${id}`, envio)
                .then(alert('cotizacion eliminada'), this.listar())
                .catch(e => console.log(e))
        }
    }

    Aceptarcotizacion(id) {
        const datos = {
            idcotizacion: id
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
        fetch('http://localhost:4000/cotizacion/aceptada', envio)
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
                this.setState({ mensaje: "Cotizacion exitosa" })
                this.listar()
                this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                this.toggleModal('notificationModal')
                this.listar()
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
        fetch('http://localhost:4000/cotizacion/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ Tusuarios: '' })
                throw new Error('Usuario no creado')
            })
            .then(token => {
                if (token.message) {

                }
                else {
                    this.setState({ Tusuarios: token.Proveedores })
                }
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }
    render() {
        return (
            <div>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(https://www.bbva.com/wp-content/uploads/2016/10/basedecotizacion-1024x416.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
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
                                                <th scope="col">Estado</th>
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
                                                            <td>{user.estado}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-success" onClick={() => this.Aceptarcotizacion(user._id)} ><i class="fas fa-check-circle"></i></button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.Eliminarcotizacion(user._id)}><i class="fas fa-times"></i></button>
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
                    size="xl"
                    isOpen={this.state.formModal2}
                    toggle={() => this.toggleModal("formModal2")}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-12 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Todos los Productos</h2>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Nombre Producto</th>
                                                <th scope="col">Categoria</th>
                                                <th scope="col">Cantidad del productos</th>
                                                <th scope="col">Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tproductos.map(producto => {
                                                    return (
                                                        <tr key={producto.id}>
                                                            <td>{producto.nombre}</td>
                                                            <td>{producto.categoria}</td>
                                                            <td>{producto.cantidad}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-danger" onClick={() => this.eliminarusuario(producto.id)}><i class="fas fa-times"></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>

            </div>
        )
    }
}

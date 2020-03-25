import React, { Component } from 'react'
import Footer from '../Footer'
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
export default class users extends Component {
    constructor() {
        super()
        this.state = {
            Tusuarios: [],
            Tproveedores: [],
            defaultModal: false,
            datoserror: {},
            usuario: {},
            mensaje: '',
            borrar: ''
        }
    }

    componentDidMount() {
        this.listar()
        this.mirarproveedor();
    }


    mirarproveedor = () => {
        const envio = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json'
            }),
        };
        fetch(`http://localhost:4000/proveedor`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Ocurrio un error')
            })
            .then(token => {
                if (token.message === 'NO CONTENT') {
                    this.setState({ mensaje: "Primero tienes que añadir un proveedor" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModalnocerrar')
                } else {
                    this.setState({ Tproveedores: token.Proveedores })
                }

                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    eliminarusuario(id) {
        if (window.confirm('Estas seguro de eliminar este producto?')) {
            const envio = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:4000',
                    'Accept': 'application/json'
                }),
            };
            fetch(`http://localhost:4000/product/_id/${id}`, envio)
                .then(alert('producto eliminado'), this.listar())
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
    
        fetch(`http://localhost:4000/product/_id/${id}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('producto no existe')
            })
            .then(token => {
                this.setState({ usuario: token.products[0] })
                this.toggleModal('formModal2')
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
        if (this.categoria === undefined) {
            this.setState({ mensaje: "Añade una categoria por favor" })
            this.setState({ datoserror: { icon: 'bell', color: 'warning' } })
            this.toggleModal('notificationModal')
        } else {
            if (window.navigator.onLine) {
                const envio = {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:4000',
                        'Accept': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                        'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
                    }),
                };
                fetch(`http://localhost:4000/proveedor/name/${this.proveedor}`, envio)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error('Proveedor no existe')
                    })
                    .then(token => {
                        const data = new FormData();
                        const imagedata = this.file
                        data.append('image', imagedata);
                        data.append('name', this.name)
                        data.append('stock', this.stock)
                        data.append('price', this.price)
                        data.append('category', this.categoria)
                        data.append('proveedor', token.Proveedores[0]._id)

                        const envio = {
                            method: 'POST',
                            mode: 'no-cors',
                            body: data,
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Origin': 'http://localhost:4000',
                                'Accept': 'application/json'
                            }),
                        };
                        fetch('http://localhost:4000/product/create', envio)
                            .then(
                                this.setState({ mensaje: "Añadido correctamente" }),
                                this.setState({ datoserror: { icon: 'check', color: 'success' } }),
                                this.toggleModal('notificationModal')
                            )
                            .catch(console.log('no se logro'))
                    })
                    .catch(e => {
                        this.setState({ mensaje: 'no registrado' })
                    })
            }
            else {
                this.setState({ mensaje: "Tienes que tener internet" })
                this.setState({ datoserror: { icon: 'times', color: 'danger' } })
                this.toggleModal('notificationModal')
            }
            /* this.componentDidMount() */
        }
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
        fetch('http://localhost:4000/product/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ Tusuarios: '' })
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ Tusuarios: token.products })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }


    consultas = (e) => {
        e.preventDefault();
        let opcion;
        if (this.opcionbusqueda === undefined) {
            this.setState({ mensaje: "Añade el tipo de dato de la busqueda por favor" })
            this.setState({ datoserror: { icon: 'bell', color: 'warning' } })
            this.toggleModal('notificationModal')
        }
        else {
            switch (this.opcionbusqueda) {
                case 'Nombre':
                    opcion = 'name'
                    break;
                case 'Precio':
                    opcion = 'price'
                    break;
                case 'Categoria':
                    opcion = 'category'
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
        fetch(`http://localhost:4000/product/${opcion}/${this.cajatexto}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Producto no encontrado')
            })
            .then(token => {
                this.setState({ Tusuarios: token.products })
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
    actualizar2 = (e) => {
        const id_d = this.state.usuario._id;
        e.preventDefault();
        if (this.categoria === undefined) {
            this.setState({ mensaje: "Añade una categoria por favor" })
            this.setState({ datoserror: { icon: 'bell', color: 'warning' } })
            this.toggleModal('notificationModal')
        } else {
            const datos = {
                name: this.name,
                stock: this.stock,
                price: this.price,
                category: this.categoria
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
            fetch(`http://localhost:4000/product/_id/${id_d}`, envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    this.setState({ mensaje: "producto no actualizado" })
                    this.setState({ datoserror: { icon: 'times', color: 'danger' } })
                    this.toggleModal('notificationModal')
                    throw new Error('producto no creado')
                })
                .then(token => {
                    this.setState({ mensaje: "producto actualizado" })
                    this.listar()
                    this.setState({ datoserror: { icon: 'check', color: 'success' } })
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
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ minHeight: '600px', backgroundImage: 'url(https://static.websguru.com.ar/var/m_8/87/870/89334/1274919-mascotas.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>
                    <div class="container-fluid d-flex align-items-center">
                        <div class="row">
                            <div class="col-lg-8 col-md-10">
                                <h5 class="display-3 text-white">Estas En la seccion de Productos</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid mt--9">
                    <div class="row">
                        <div class="col-xl-4 order-xl-2 mb-0 mb-xl-0">
                            <div class="card card-profile shadow">
                                <div class="card-body mt-4 pt-md-4">
                                    <div class="text-center">
                                    <h3>
                                            ¡¡TEN CUIDADO!!
                                        </h3>
                                        <div>
                                            <i class="ni education_hat mr-2"></i>En este modulo podras crear, actualizar, editar o eliminar Productos. Asi como ver los Productos ya creados o buscar uno en especifico.
                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">Agregar productos</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.UserNew} encType="multipart/form-data" >

                                        <div class="row align-items-center">
                                            <div class="col-8">
                                                <h6 class="heading-small text-muted mb-4">Informacion del producto</h6>
                                            </div>
                                            <div class="col-4 text-right">
                                                <button type="submit" class="btn btn-sm btn-primary">Agregar</button>
                                            </div>
                                        </div>
                                        <div class="pl-lg-4">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-username">Nombre Producto</label>
                                                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Nombre" onChange={e => this.name = e.target.value} required />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-email">precio</label>
                                                        <input type="text" id="input-email" class="form-control form-control-alternative" placeholder="5000" onChange={e => this.price = e.target.value} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                <div class="form-group">
                                                        <label class="form-control-label" for="input-first-name">Stock</label>
                                                        <input type="number" id="input-first-name" class="form-control form-control-alternative" placeholder="123456" onChange={e => this.stock = e.target.value} required />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">categoria</label>
                                                        <div class="form-group">
                                                            <select class="form-control form-control-alternative" id="exampleFormControlSelect1" onChange={e => this.categoria = e.target.value} required>
                                                                <option>Seleccionar</option>
                                                                <option>Alimentos</option>
                                                                <option>Juguetes</option>
                                                                <option>Medicamentos</option>
                                                                <option>Accesorios</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">Proveedor</label>
                                                        <Link to="/proveedor" className="text-right">Agregar Proveedor</Link>
                                                        <div class="form-group">
                                                            <select class="form-control form-control-alternative" id="exampleFormControlSelect1" onChange={e => this.proveedor = e.target.value} required>
                                                                <option>Seleccionar</option>
                                                                {this.state.Tproveedores.map(pro => {
                                                                    return (
                                                                        <option key={pro.name}>{pro.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <label class="form-control-label" for="input-last-name">Imagen Producto</label>
                                                        <div class="form-group">
                                                            <input type="file" name="image" onChange={e => this.file = e.target.files[0]} required />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
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
                                                                <option>Precio</option>
                                                                <option>Categoria</option>
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
                                                            <input class="form-control" placeholder="Buscar" type="text" onChange={e => this.cajatexto = e.target.value} required />
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
                                        <div class="col">
                                            <h3 class="mb-0">Productos</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">precio</th>
                                                <th scope="col">categoria</th>
                                                <th scope="col">stock</th>
                                                <th scope="col">opcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.price}</td>
                                                            <td>{user.category}</td>
                                                            <td>{user.stock}</td>
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
                            onClick={() => { this.toggleModal("notificationModal") }}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className={`fas fa-${this.state.datoserror.icon} ni-5x`} />
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
                                    <h2>Actualizar producto </h2>
                                    <p>Vas a actualizar los datos de <h4>{this.state.usuario.name}</h4></p>
                                </div>
                                <Form role="form" onSubmit={this.actualizar2}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" onChange={e => this.name = e.target.value} placeholder={`Nombre: ${this.state.usuario.name}`} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" onChange={e => this.price = e.target.value} placeholder={`Precio: $${this.state.usuario.price}`} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" onChange={e => this.stock = e.target.value} placeholder={`Stock: ${this.state.usuario.stock}`} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" name="select" id="exampleSelect" onChange={e => this.categoria = e.target.value} placeholder={this.state.usuario.category} required>
                                                <option>Seleccionar</option>
                                                <option>Alimentos</option>
                                                <option>Juguetes</option>
                                                <option>Medicamentos</option>
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

                <Modal
                    className={`modal-dialog-centered modal-${this.state.datoserror.color}`}
                    contentClassName={`bg-${this.state.datoserror.color}`}
                    isOpen={this.state.notificationModalnocerrar}
                    backdrop='static'
                    toggle={() => this.toggleModal("notificationModalnocerrar")}
                >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => { this.toggleModal("notificationModalnocerrar") }}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className={`fas fa-${this.state.datoserror.icon} ni-5x`} />
                            <h4 className="heading mt-4">Alerta</h4>
                            <p>
                                {this.state.mensaje}
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            to="/proveedor"
                        >
                            Close
                </Link>
                    </div>
                </Modal>
            </div>
        )
    }
}
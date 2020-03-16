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
            productoramdom: {},
            mensaje: '',
            Tusuarios: [],
            tablaabregar:[]
        }
    }

    componentDidMount() {
        this.productorandom()
        this.listarproductos()
    }
    productorandom = () => {
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
        fetch('http://localhost:4000/product/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no creado')
            })
            .then(token => {
                console.log()
                let totales = token.products.length
                var aleatorio = Math.round(Math.random() * totales);
                this.setState({ productoramdom: token.products[aleatorio] })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    };

    Mostarselecionado = (id) => {
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
        fetch(`http://localhost:4000/product/_id/${id}`, envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no creado')
            })
            .then(token => {
                this.setState({ productoramdom: token.products[0] })
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })
    }

    listarproductos = () => {
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
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
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
        this.listarproductos();
    }

    agregaralatablaprincipal = (e)=>{
        e.preventDefault()
        const data = {
            id:this.id,
            stock:this.stock,
            categoria:this.categoria,
            cantidad:this.cantidad
        }
        console.log(data)
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
                            <div class="card" style={{ width: '100%' }}>
                                <img src={this.state.productoramdom.imageUrl} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <form action="" onSubmit={this.agregaralatablaprincipal}>
                                        <h1 class="card-title text-center">{this.state.productoramdom.name}</h1>
                                        <h5 class="card-title">ID</h5>
                                        <div class="form-group">
                                            <input value={this.state.productoramdom._id} type="text" id="disabledTextInput" class="form-control" onChange={e => this.id = e.target.value}/>
                                        </div>
                                        <h5 class="card-title">Stock</h5>
                                        <div class="form-group">
                                            <input value={this.state.productoramdom.stock} type="text" id="disabledTextInput" class="form-control" onChange={e => this.stock = e.target.value}/>
                                        </div>
                                        <h5 class="card-title">Categoria</h5>
                                        <div class="form-group">
                                            <input value={this.state.productoramdom.category} type="text" id="disabledTextInput" class="form-control " onChange={e => this.categoria = e.target.value}/>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label" for="input-first-name">Cantidad <span className="text-danger">*</span></label>
                                            <input type="number" min="0" max="3"  id="input-first-name" class="form-control form-control-alternative" placeholder="Digite un valor" onChange={e => this.cantidad = e.target.value} required />
                                        </div>
                                        <button type="submit" class="btn btn-primary btn-lg btn-block">Agregar</button>
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
                                                            <input class="form-control" placeholder="Search" type="text" onChange={e => this.cajatexto = e.target.value} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="col-xl-12 order-xl-2">
                                    <div class="col-xl-6 order-xl-2 mx-auto">
                                        <div class="card bg-secondary shadow">
                                            <div class="card-header bg-white border-0">
                                                <form onSubmit={this.mostartodo}>
                                                    <div class="row align-items-center">
                                                        <div class="col-5">
                                                            <h3 class="mb-0">Mostar todos</h3>
                                                        </div>
                                                        <div class="col-7">
                                                            <button type="submit" className="btn btn-default btn-lg btn-block">Mostrar Todos</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card shadow">
                                        <div class="card-header border-0">
                                            <div class="row align-items-center">
                                                <div class="col-6">
                                                    <h3 class="mb-0">Productos</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table align-items-center table-flush">
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Stock</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Categoria</th>
                                                        <th scope="col">Mostrar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.Tusuarios.map(user => {
                                                            return (
                                                                <tr key={user._id}>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.stock}</td>
                                                                    <td>{user.price}</td>
                                                                    <td>{user.category}</td>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-default" onClick={() => this.Mostarselecionado(user._id)}><i class="fas fa-eye"></i></button>
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
                        </div>
                    </div>
                    <div class="col-xl-12 order-xl-2 mx-auto">
                        <div class="card shadow">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col-6">
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
            </div>
        )
    }
}

import React, { Component } from 'react'
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
import { Link } from 'react-router-dom';
export default class users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Tusuarios: [],
            Tcategoria: [],
            defaultModal: false,
            datoserror: {},
            usuario: {},
            mensaje: '',
            borrar: ''
        }
    }

    componentDidMount() {
        this.comprobar()
        this.listar()
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
        fetch('http://localhost:4000/categoria/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Categoria no existe')
            })
            .then(token => {
                if (token.message === 'NO CONTENT') {
                    this.toggleModal('formModal3')
                }
                else {
                    this.setState({ Tcategoria: token.categoria })
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

    listar = (e) => {
        const token12 = localStorage.getItem('token')
        const envio = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:4000',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token12}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
                'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
                'Authorization': `Bearer ${token12}`
            },
        };
        fetch('http://localhost:4000/product/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Usuario no creado')
            })
            .then(token => {
                const Tusu = token.products
                const Nueva = []
                for (let index = 0; index < Tusu.length; index++) {
                   const idcategoria = Tusu[index].category
                   const envio = {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Origin': 'http://localhost:4000',
                        'Accept': 'application/json'
                    }),
                };
                fetch('http://localhost:4000/categoria/_id/'+idcategoria, envio)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error('Categoria no existe')
                    })
                    .then(token => {
                        Tusu[index].category = token.categoria[0].category
                        return;
                    })
                    .catch(e => {
                        this.setState({ mensaje: e.message })
                    })

                }
                 this.setState({ Tusuarios: Tusu }) 
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

        const categoria = this.categoria;

        if (this.categoria === undefined) {
            this.setState({ mensaje: "Añade una categoria por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
            this.toggleModal('notificationModal')
        } else {
            const envio = {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:4000',
                    'Accept': 'application/json'
                }),
            };
            fetch(`http://localhost:4000/categoria/category/${categoria}`, envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error('producto no existe')
                })
                .then(token => {
                    const datos2 = {
                        name: this.name,
                        stock: this.stock,
                        price: this.price,
                        category: token.categoria[0]._id
                    }
                    console.log(datos2)
                     const envio2 = {
                        method: 'POST',
                        body: JSON.stringify(datos2),
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'Origin': 'http://localhost:4000',
                            'Accept': 'application/json'
                        }),
                    };
                    fetch('http://localhost:4000/product/create', envio2)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                            this.setState({ mensaje: "producto no creado" })
                            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                            this.toggleModal('notificationModal')
                            throw new Error('producto no creado')
                        })
                        .then(token => {
                            this.setState({ mensaje: "producto creado" })
                            this.listar()
                            this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                            this.toggleModal('notificationModal')
                            return;
                        })
                        .catch(e => {
                            this.setState({ mensaje: e.message })
                        }) 
                    return;
                })
                .catch(e => {
                    this.setState({ mensaje: e.message })
                })

        }
    }

    categoriaprimera = (e) => {
        e.preventDefault();
        const datos = {
            category: this.categoria
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
        fetch('http://localhost:4000/categoria/create/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "categoria no creada o ya existe" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
                throw new Error('Categoria no creada')
            })
            .then(token => {
                    this.setState({ mensaje: "muy bien" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                    this.toggleModal('notificationModal1')
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })

    }
    categoriasegunda = (e) => {
        e.preventDefault();
        const datos = {
            category: this.categoria
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
        fetch('http://localhost:4000/categoria/create/', envio)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                this.setState({ mensaje: "categoria no creada o ya existe" })
                this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                this.toggleModal('notificationModal')
                throw new Error('Categoria no creada')
            })
            .then(token => {
                    this.setState({ mensaje: "muy bien" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'success' } })
                    this.toggleModal('notificationModal')
                    this.componentDidMount()
                    
                return;
            })
            .catch(e => {
                this.setState({ mensaje: e.message })
            })

    }

    actualizar2 = (e) => {
        const id_d = this.state.usuario._id;
        e.preventDefault();
        if (this.categoria === undefined) {
            this.setState({ mensaje: "Añade una categoria por favor" })
            this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
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
            console.log(envio)
            fetch(`http://localhost:4000/product/_id/${id_d}`, envio)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    this.setState({ mensaje: "producto no actualizado" })
                    this.setState({ datoserror: { icon: 'fat-remove', color: 'danger' } })
                    this.toggleModal('notificationModal')
                    throw new Error('producto no creado')
                })
                .then(token => {
                    this.setState({ mensaje: "producto actualizado" })
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
                                <h5 class="display-3 text-white">Estas En la seccion de Productos</h5>
                                <p class="text-white mt-0 mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum itaque tempore suscipit ipsa rem, dolorem atque corporis soluta facere ullam similique quidem eius quibusdam nobis, recusandae veniam. Totam, tempore ipsam!</p>
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
                                            <h3 class="mb-0">Agregar producto</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.UserNew}>

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
                                                        <Link onClick = {() => this.toggleModal("formModal4")}> Nueva categoria</Link>
                                                        <div class="form-group">
                                                            <select class="form-control form-control-alternative" id="exampleFormControlSelect1" onChange={e => this.categoria = e.target.value} required>
                                                                <option>Seleccionar</option>
                                                                {
                                                                    this.state.Tcategoria.map(categoria => {
                                                                        return (
                                                                            <option>{categoria.category}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
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
                                            <Input type="number" onChange={e => this.price = e.target.value} placeholder={this.state.usuario.price} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" onChange={e => this.stock = e.target.value} placeholder={this.state.usuario.stock} required />
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
                                    <h2>Antes de empezar</h2>
                                    <p>Tienes que tener una categoria para agregar el primer producto</p>
                                </div>
                                <Form role="form" onSubmit={this.categoriaprimera}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Categoria" type="text" onChange={e => this.categoria = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Guardar Categoria
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
                    isOpen={this.state.formModal4}
                    toggle={() => this.toggleModal("formModal4")}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h2>Agregar categoria</h2>
                                    <p>Nueva Categoria</p>
                                </div>
                                <Form role="form" onSubmit={this.categoriasegunda}>
                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Categoria" type="text" onChange={e => this.categoria = e.target.value} required />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="submit"
                                        >
                                            Guardar Categoria
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
                    isOpen={this.state.notificationModal1}
                    backdrop="static"
                    toggle={() => this.toggleModal("notificationModal1")}
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
                            <h4 className="heading mt-4">Muy bien puedes continuar</h4>
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
                            to="/admin"
                        >
                            Close
                </Link>
                    </div>
                </Modal>
            </div>
        )
    }
}

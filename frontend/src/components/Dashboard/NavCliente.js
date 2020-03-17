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
export default class nav extends Component {
  constructor() {
    super()
    this.state = {
      datos: {},
      defaultModal: false,
      mensaje:'',
      datoserror: {}
    }
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  componentDidMount() {
    const datos = localStorage.getItem('datos')
    this.setState({ datos: datos })


    const data = {
      username: JSON.parse(localStorage.getItem('datos')).username,
      password: JSON.parse(localStorage.getItem('datos')).username
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
        throw new Error('Usuario no existe')
      })
      .then(token => {
        if (token.message === 'PASSWORD INCORRECTA') {
        } else {
          this.toggleModal('formModal2')
        }
        return;
      })
      .catch(e => {
        this.setState({ mensaje: e.message })
      })
  }
  actualizar2 = (e) => {
    e.preventDefault();
    const datos = {
      password: this.Nueva
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
    fetch(`http://localhost:4000/user/_id/${JSON.parse(localStorage.getItem('datos')).id}`, envio)
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
      <div >
        <nav class="navbar navbar-top navbar-expand-md" id="navbar-main" style={{background:'linear-gradient(87deg, #306647 0, #418C60 100%)'}}>
          <div class="container-fluid">
            <a class="h2 mb-0 text-white text-uppercase d-none d-lg-inline-block">¡Bienvenido!</a>
            <ul class="navbar-nav align-items-center d-none d-md-flex">
              <li class="nav-item dropdown text-rigth">
                <a class="nav-link pr-5" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                      <img alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsuVJQKyHvQqWoBdSh4uhwIxSfAWX-RdncA1jR5hglydSbOAAS" />
                    </span>
                    <div class="media-body ml-2 d-none d-lg-block">
                      <span class="mb-0 text-sm  font-weight-bold text-white">{JSON.parse(localStorage.getItem('datos')).name ? JSON.parse(localStorage.getItem('datos')).name : 'sin usuario'}</span>
                    </div>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div class=" dropdown-header noti-title">
                    <h6 class="text-overflow m-0">¡Bienvenido!</h6>
                  </div>
                  <Link to="/profile" class="dropdown-item">
                    <i class="ni ni-single-02"></i>
                    <span>Mi perfil</span>
                  </Link>
                  <div class="dropdown-divider"></div>
                  <Link to="/logout" class="dropdown-item">
                    <i class="ni ni-user-run"></i>
                    <span>salir</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
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
                  <h2>Cambia tu contraseña</h2>
                  <p>Digita tu nueva contraseña! campo obligatorio</p>
                </div>
                <Form role="form" onSubmit={this.actualizar2}>
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
                      Cambiar
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
            <Link
              className="text-white ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              to="/"
            >
              Close
                </Link>
          </div>
        </Modal>
      </div>
    )
  }
}
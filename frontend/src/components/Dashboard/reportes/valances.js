import React, { Component } from 'react'

export default class nosea extends Component {
  constructor(){
    super();
    this.state = {
      tusuarios:0,
      tproductos:0,
      ganancias:0,
      Cotizacionesp:0
    }
  }
  componentDidMount(){
    this.productos();
    this.usuaios();
    this.ganancias();
    this.cotizacionesp();
  }

  cotizacionesp = () =>{
    const envio = {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Origin': 'https://veterinariapetshop.herokuapp.com/',
          'Accept': 'application/json'
      }),
  };
  fetch('https://veterinariapetshop.herokuapp.com/cotizacion', envio)
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error('Usuario no existe')
      })
      .then(token => {
         this.setState({Cotizacionesp:token.Proveedores.length})
          return;
      })
      .catch(e => {
          this.setState({ mensaje: e.message })
      })
  }

  ganancias = () =>{
    const envio = {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Origin': 'https://veterinariapetshop.herokuapp.com/',
          'Accept': 'application/json'
      }),
  };
  fetch('https://veterinariapetshop.herokuapp.com/ventas/', envio)
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error('Usuario no existe')
      })
      .then(token => {
        this.setState({ganancias:token.suma})
          return;
      })
      .catch(e => {
          this.setState({ mensaje: e.message })
      })
  }

  productos = () =>{
    const envio = {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Origin': 'https://veterinariapetshop.herokuapp.com/',
          'Accept': 'application/json'
      }),
  };
  fetch('https://veterinariapetshop.herokuapp.com/product/', envio)
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error('Usuario no existe')
      })
      .then(token => {
        this.setState({tproductos:token.products.length})
          return;
      })
      .catch(e => {
          this.setState({ mensaje: e.message })
      })
  }


  usuaios = () =>{
    const envio = {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Origin': 'https://veterinariapetshop.herokuapp.com/',
          'Accept': 'application/json'
      }),
  };
  fetch('https://veterinariapetshop.herokuapp.com/user/', envio)
      .then(response => {
          if (response.ok) {
              return response.json()
          }
          throw new Error('Usuario no existe')
      })
      .then(token => {
        this.setState({tusuarios:token.users.length})
          return;
      })
      .catch(e => {
          this.setState({ mensaje: e.message })
      })
  }
    render() {
        return (
            <div>
                <div class="header bg-gradient-primary pb-8 mt--4 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row">
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Usuarios Totales</h5>
        <span class="h2 font-weight-bold mb-0">{this.state.tusuarios}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i class="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Productos Totales</h5>
                      <span class="h2 font-weight-bold mb-0">{this.state.tproductos}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fas fa-chart-pie"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Total Ganancias</h5>
        <span class="h2 font-weight-bold mb-0">${this.state.ganancias}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i class="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Cotizaciones pendientes</h5>
        <span class="h2 font-weight-bold mb-0">{this.state.Cotizacionesp}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i class="fas fa-percent"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
        )
    }
}
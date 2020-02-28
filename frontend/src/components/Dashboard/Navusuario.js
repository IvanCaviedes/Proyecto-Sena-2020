import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class nav extends Component {
  constructor() {
    super()
    this.state = {
      datos: {}
    }
  }
  componentDidMount() {
    const datos = localStorage.getItem('datos')
    this.setState({ datos: datos })
  }
  render() {
    return (
      <div >
        <nav class="navbar navbar-top navbar-expand-md bg-gradient-primary" id="navbar-main">
          <div class="container-fluid">
            <a class="h3 mb-0 text-white text-uppercase d-none d-lg-inline-block">Valances y reportes</a>
            <ul class="navbar-nav align-items-center d-none d-md-flex">
              <li class="nav-item dropdown">
                <a class="nav-link pr-5" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                      <img alt="Avatar" src="https://media.aweita.larepublica.pe/678x508/aweita/imagen/2018/02/08/noticia-persona-positiva.png" />
                    </span>
                    <div class="media-body ml-2 d-none d-lg-block">
    <span class="mb-0 text-sm  font-weight-bold text-white">{JSON.parse(localStorage.getItem('datos')).name?JSON.parse(localStorage.getItem('datos')).name:'sin usuario'}</span>
                    </div>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div class=" dropdown-header noti-title">
                    <h6 class="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="./examples/profile.html" class="dropdown-item">
                    <i class="ni ni-single-02"></i>
                    <span>My profile</span>
                  </a>
                  <a href="./examples/profile.html" class="dropdown-item">
                    <i class="ni ni-settings-gear-65"></i>
                    <span>Settings</span>
                  </a>
                  <a href="./examples/profile.html" class="dropdown-item">
                    <i class="ni ni-calendar-grid-58"></i>
                    <span>Activity</span>
                  </a>
                  <a href="./examples/profile.html" class="dropdown-item">
                    <i class="ni ni-support-16"></i>
                    <span>Support</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <Link to="/logout" class="dropdown-item">
                    <i class="ni ni-user-run"></i>
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
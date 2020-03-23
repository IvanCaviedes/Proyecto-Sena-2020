import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class menudash extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-ico  <!-- User -->n"></span>
                    </button>
                    <a class="navbar-brand pt-4 pl-5 pb-3" href="./index.html">{/* 
                        <img src="https://i.imgur.com/B8YoPhk.png" class="navbar-brand-img" alt="..." /> */}
                        <h1>PET SHOP</h1>
                    </a>
                    <ul class="nav align-items-center d-md-none">
                        <li class="nav-item dropdown text-rigth">
                            <a class="nav-link pr-5" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="media align-items-center">
                                    <span class="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="./assets/img/theme/team-1-800x800.jpg" />
                                    </span>
                                    <div class="media-body ml-2  d-lg-block">
                                        <span class="mb-0 text-sm font-weight-bold">Ivan</span>
                                    </div>
                                </div>
                            </a>
                            <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                                <div class=" dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">¡Bienvenido!</h6>
                                </div>
                                <Link to="/admin" class="dropdown-item">
                                    <i class="ni ni-single-02"></i>
                                    <span>Reportes</span>
                                </Link>
                                <Link to="/users" class="dropdown-item">
                                    <i class="ni ni-settings-gear-65"></i>
                                    <span>Usuarios</span>
                                </Link>
                                <Link to="/productos" class="dropdown-item">
                                    <i class="ni ni-calendar-grid-58"></i>
                                    <span>Productos</span>
                                </Link>
                                <Link to="/proveedor" class="dropdown-item">
                                    <i class="ni ni-support-16"></i>
                                    <span>Proveedores</span>
                                </Link>
                                <div class="dropdown-divider"></div>
                                <Link href="#!" class="dropdown-item">
                                    <i class="ni ni-user-run"></i>
                                    <span>Salir</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                        <div class="navbar-collapse-header d-md-none">
                            <div class="row">
                                <div class="col-6 collapse-brand">
                                    <a href="./index.html">
                                        <img src="./assets/img/brand/blue.png" />
                                    </a>
                                </div>
                                <div class="col-6 collapse-close">
                                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form class="mt-4 mb-3 d-md-none">
                            <div class="input-group input-group-rounded input-group-merge">
                                <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search" />
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="fa fa-search"></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <ul class="navbar-nav ml-2">
                            <li class="nav-item">
                                <Link class="nav-link" to="/admin"><i class="ni ni-tv-2 text-primary"></i> Reportes</ Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " to="/users"><i class="fas fa-users text-blue"></i>Usuarios</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " to="/productos"><i class="fas fa-capsules text-red"></i>Productos</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " to="/Proveedor"><i class="fas fa-luggage-cart text-yellow"></i>Proveedores</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " to="/clientecrud"><i class="fas fa-user-tag text-purple"></i>Clientes</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " to="/cotizaciones"><i class="fas fa-money-bill-alt text-green"></i>Cotizaciones</Link>
                            </li>
                            {/* <li class="nav-item">
                                <Link class="nav-link " to="/maps"><i class="fas fa-route text-orange"></i>Domicilios</Link>
                            </li> */}

                        </ul>
                        <hr class="my-3" />
                        <h6 class="navbar-heading text-muted">Documentation</h6>
                        <ul class="navbar-nav mb-md-3 ml-2">
                            <li class="nav-item">
                                <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard/docs/getting-started/overview.html">
                                    <i class="fab fa-github"></i> GitHub Oficial
                                    </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
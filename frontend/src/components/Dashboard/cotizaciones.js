import React, { Component } from 'react'
import Menudash from './navbar'
import Nav from './Navusuario'
import Cotizaciones from './cotizaciones/cotizaciones'
export default class users extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
                    <Menudash />
                </nav>
                <div class="main-content">
                    <Nav />
                    <Cotizaciones />
                </div>
            </div>
        )
    }
}
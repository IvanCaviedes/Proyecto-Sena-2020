import React, { Component } from 'react'
import Nav from '../Dashboard/Navusuario'
import Pdf from './pdf/prueba'
import Menudash from './navbar'
export default class users extends Component {
    render() {
        return (
            <div>
                               <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
                <Menudash />
                </nav>
                <div class="main-content bg-dark">
                    <Nav />
                    <Pdf/>
                </div>
            </div>
        )
    }
}

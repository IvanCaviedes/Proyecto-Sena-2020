import React, { Component } from 'react'

import Menudash from './Dashboard/navbar'
import Nav from './Dashboard/Navusuario'
import Ven from './Dashboard/ventas'
import Nop from './Dashboard/esto'


export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
                <Menudash />
                </nav>
                <div class="main-content">
                    <Nav />
                    <Nop/>
                    <Ven/>
                </div>
            </div>
        )
    }
}
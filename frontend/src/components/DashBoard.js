import React, { Component } from 'react'

import Menudash from './docs/menudash'
import Nav from './docs/nav'
import Ven from './docs/ventas'
import Nop from './docs/nosea'


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

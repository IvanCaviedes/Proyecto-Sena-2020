import React, { Component } from 'react'
import Menudash from '../Dashboard/navbar'
import Nav from '../Dashboard/Navusuario'
import Profile from '../Dashboard/profile/profile'
export default class users extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
                    <Menudash />
                </nav>
                <div class="main-content">
                    <Nav />
                    <Profile/>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'

import Nav from '../Dashboard/NavCliente'
import Cliente from './cliente/cliente'


export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <div class="main-content">
                    <Nav />
                    <Cliente/>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <h1>Estas en Dashboard</h1>
                <button onClick ={this.iniciosesion}>hola</button>
            </div>
        )
    }
}

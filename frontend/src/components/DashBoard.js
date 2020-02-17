import React, { Component } from 'react'

import Menudash from './docs/menudash'
import Nav from './docs/nav'
import Header from './docs/tablero'

export default class DashBoard extends Component {
    render() {
        return (
            <div>
                <Menudash/>
                
                <Header/>
            </div>
        )
    }
}

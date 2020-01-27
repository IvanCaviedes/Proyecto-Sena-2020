import React, { Component } from 'react'
import Top from './components/docs/TopEle'
import Header from './components/docs/header'
import Selection from './components/docs/selectionpage'
import Buscar from './components/docs/buscar'
export default class app extends Component {
    render() {
        return (
            <div>
                <Top />
                <div class="main-warp">
                    <Header />
                    <Selection />
                </div>
                <Buscar />
            </div>
        )
    }
}
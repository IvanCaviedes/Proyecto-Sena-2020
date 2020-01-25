import React, { Component } from 'react'
import Loader from './components/Inicial/loader'
import Top from './components/Inicial/TopEle'
import Header from './components/Inicial/header'
import Selection from './components/Inicial/selectionpage'
import Buscar from './components/Inicial/buscar'
export default class app extends Component {
    render() {
        return (
            <div>
                <Loader/>
                <Top/>
                <div class="main-warp">
                    <Header/>
                    <Selection/>
                </div>
                <Buscar/>
            </div>
        )
    }
}
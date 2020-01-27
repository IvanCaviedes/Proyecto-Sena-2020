import React, { Component } from 'react'
import Top from './docs/TopEle'
import Buscar from './docs/buscar'
import Header from './docs/header'
/* import Loader from './docs/loader'
 */import Selection from './docs/selectionpage'

export default class index extends Component {
    render() {
        return (
            <div>
               <div>
               {/*  <Loader/> */}
                <Top/>
                <div class="main-warp">
                    <Header/>
                    <Selection/>
                </div>
                <Buscar/>
            </div>
            </div>
        )
    }
}

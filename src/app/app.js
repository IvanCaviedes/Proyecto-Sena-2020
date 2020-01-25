import React, { Component } from 'react'
import Navbar from './components/index/navbar'
import Aside from './components/index/aside'


export default class app extends Component {
    render() {
        return (
            <div id="page">
                <Navbar/>
                <Aside/>
            </div>
        )
    }
}
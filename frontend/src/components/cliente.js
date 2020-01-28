import React, { Component } from 'react'
import Insta from './docs/insta'
import Baner from './docs/baner'
import Header from './docs/header'
import Blog from './docs/blog'
import Servicio from './docs/service'
import Feed from './docs/feed'
import Footer from './docs/footer'

export default class index extends Component {
    render() {
        return (
            <div>
                <Header />
                <Baner />
                <Blog />
                <Servicio/>
                <Feed />
                <Insta />
                <Footer />
            </div>
        )
    }
}

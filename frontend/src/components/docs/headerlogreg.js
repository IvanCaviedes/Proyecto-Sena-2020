import React, { Component } from 'react'

export default class headerlogreg extends Component {
    render() {
        return (
            <div>
                <div class="header bg-gradient-primary py-7 py-lg-5">
                    <div class="container">
                        <div class="header-body text-center mb-7">
                            <div class="row justify-content-center">
                                <div class="col-lg-5 col-md-6">
                                    <h1 class="text-white">Bienvenido!</h1>
                                    <p class="text-lead text-light">Prodra administrar su compañia desde este sistem de información.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator separator-bottom separator-skew zindex-100">
                        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>
            </div>
        )
    }
}

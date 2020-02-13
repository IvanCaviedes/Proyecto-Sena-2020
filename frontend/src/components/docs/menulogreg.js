import React, { Component } from 'react'

export default class menulogreg extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-top navbar-horizontal navbar-expand-md navbar-dark">
                    <div class="container px-4">
                        <a class="navbar-brand" href="../index.html">
                            <img src="../assets/img/brand/white.png" />
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbar-collapse-main">

                            <div class="navbar-collapse-header d-md-none">
                                <div class="row">
                                    <div class="col-6 collapse-brand">
                                        <a href="../index.html">
                                            <img src="../assets/img/brand/blue.png" />
                                        </a>
                                    </div>
                                    <div class="col-6 collapse-close">
                                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <ul class="navbar-nav ml-auto">

                                <li class="nav-item">
                                    <a class="nav-link nav-link-icon" href="./cliente/html/Cliente.html">
                                        <i class="ni ni-single-02"></i>
                                        <span class="nav-link-inner--text">HomePage</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer class="footer pt-0">
                <div class="row align-items-center justify-content-lg-between">
                    <div class="col-lg-6">
                        <div class="copyright text-center  text-lg-left  text-muted">
                            &copy; 2020 
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
                        <li class="nav-item">
                                        <a href="https://github.com/ITSKY152" class="nav-link" target="_blank">ITSKY152</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="https://github.com/andball9" class="nav-link" target="_blank">ANDBALL9</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="https://github.com/ITSKY152/Proyecto-Sena-2020" class="nav-link" target="_blank">Repositorio</a>
                                    </li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

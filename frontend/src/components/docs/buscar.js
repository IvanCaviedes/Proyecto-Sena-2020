import React, { Component } from 'react'

export default class buscar extends Component {
    render() {
        return (
            <div class="search-model">
                <div class="h-100 d-flex align-items-center justify-content-center">
                    <div class="search-close-switch">x</div>
                    <form class="search-moderl-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>
        )
    }
}

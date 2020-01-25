import React, { Component } from 'react'
import Hola from './img/1.jpg'
export default class aside extends Component {
    render() {
        return (
            <div>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={Hola} />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="" alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="" alt="Third slide" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

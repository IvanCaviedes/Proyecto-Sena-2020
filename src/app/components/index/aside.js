import React, { Component } from 'react'
import img1 from './img/img_bg_1.jpg'

export default class aside extends Component {
    render() {
        return (
            <div>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src={require('./img/img_bg_1.jpg')} />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={img1} alt="Second slide" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src={img1} alt="Third slide" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

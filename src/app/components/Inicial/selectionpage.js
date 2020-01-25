import React, { Component } from 'react'

export default class selectionpage extends Component {
    render() {
        return (
            <div class="page-section home-page">
                <div class="hero-slider owl-carousel">
                    <div class="slider-item d-flex align-items-center set-bg" data-setbg="img/slider-bg-1.jpg" data-hash="slide-1">
                        <div class="si-text-box">
                            <span>Photography</span>
                            <h2>Project No. 1</h2>
                            <p>Ut pellentesque auctor lorem, at maximus lacus faucibus nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris auctor nunc non nulla euismod consequat. Pellentesque non mattis nulla. Fusce quis tempor risus, non elemen tum dui. Curabitur et mattis ex, a ultrices.</p>
                            <a href="" class="site-btn">Read More</a>
                        </div>
                        <div class="next-slide-show set-bg" data-setbg="img/slider-bg-2.jpg">
                            <a href="#slide-2" class="ns-btn">Next</a>
                        </div>
                    </div>
                    <div class="slider-item d-flex align-items-center set-bg" data-setbg="img/slider-bg-2.jpg" data-hash="slide-2">
                        <div class="si-text-box">
                            <span>Photography</span>
                            <h2>Project No. 2</h2>
                            <p>Ut pellentesque auctor lorem, at maximus lacus faucibus nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris auctor nunc non nulla euismod consequat. Pellentesque non mattis nulla. Fusce quis tempor risus, non elemen tum dui. Curabitur et mattis ex, a ultrices.</p>
                            <a href="" class="site-btn">Read More</a>
                        </div>
                        <div class="next-slide-show set-bg" data-setbg="img/slider-bg-1.jpg">
                            <a href="#slide-1" class="ns-btn">Next</a>
                        </div>
                    </div>
                </div>
                <div id="snh-1"></div>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class header extends Component {
    render() {
        return (
<header class="header-section">
			<div class="header-close">
				<i class="fa fa-times"></i>
			</div>
			<div class="header-warp">
				<a href="" class="site-logo">
					<img src="https://technext.github.io/photogallery/img/logo.png" alt=""/>
				</a>
				<img src="https://technext.github.io/photogallery/img/menu-icon.png" alt="" class="menu-icon"/>
				<ul class="main-menu">
					<li class="active"><a href="./home.html">Home</a></li>
					<li><a href="./gallery.html">Gallery</a></li>
					<li><a href="./gallery-single.html">Single gallery</a></li>
					<li><a href="./blog.html">Blog</a></li>
					<li><a href="./contact.html">Contact</a></li>
				</ul>
				<div class="social-links-warp">
					<div class="social-links">
						<a href=""><i class="fa fa-behance"></i></a>
						<a href=""><i class="fa fa-dribbble"></i></a>
						<a href=""><i class="fa fa-twitter"></i></a>
						<a href=""><i class="fa fa-facebook"></i></a>
						<a href=""><i class="fa fa-pinterest"></i></a>
					</div>
				</div>
			</div>
			<div class="copyright">Colorlib 2018  @ All rights reserved</div>
		</header>
        )
    }
}

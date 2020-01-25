import React, { Component } from 'react'

export default class header extends Component {
	render() {
		return (
			<header class="header-section">
				<div class="header-close">
					<i class="fa fa-times"></i>
				</div>
				<div class="header-warp" >
					<a href="" class="site-logo">
						<img src="https://i.imgur.com/buHZ6uM.png" alt="" />
					</a>
					<img src="https://technext.github.io/photogallery/img/menu-icon.png" alt="" class="menu-icon" />
					<ul class="main-menu">
						<li class="active"><a href="./home.html">Home</a></li>
						<li><a href="./gallery.html">Gallery</a></li>
						<li><a href="./contact.html">Contact</a></li>
						<h6 className="text-center">Tienes cuenta?</h6>
						<li className="text-center"><button type="button" class="btn btn-primary w-50 ">Iniciar sesion</button></li>
					</ul>
					<h5 className="text-center">Chequea el repocitorio oficial <i fa class="fa fa-github"></i> 
					<a href="https://github.com/ITSKY152?tab=repositories"> Aqui!</a>
					</h5>
				</div>
				
				<div class="copyright">Todos los derechos reservados a: </div>
			</header>
		)
	}
}

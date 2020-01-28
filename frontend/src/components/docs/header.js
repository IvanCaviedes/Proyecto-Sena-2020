import React, { Component } from 'react'

export default class header extends Component {
	render() {
		return (
			<header class="header_area">
				<div class="main_menu">
					<nav class="navbar navbar-expand-lg navbar-light">
						<div class="container">
							<a class="navbar-brand logo_h" href="http://localhost:3000/"><img width="120px" src="https://i.imgur.com/B8YoPhk.png" alt="" /></a>
							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
								<ul class="nav navbar-nav menu_nav ml-auto">
									<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
									<li class="nav-item"><a class="nav-link" href="about-us.html">About</a></li>
									<li class="nav-item submenu dropdown">
										<a href="/" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Projects</a>
										<ul class="dropdown-menu">
											<li class="nav-item"><a class="nav-link" href="projects.html">Projects</a></li>
											<li class="nav-item"><a class="nav-link" href="project-details.html">Project Details</a></li>
										</ul>
									</li>
									<li class="nav-item submenu dropdown">
										<a href="/" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
										<ul class="dropdown-menu">
											<li class="nav-item"><a class="nav-link" href="elements.html">Elements</a></li>
										</ul>
									</li>
									<li class="nav-item submenu dropdown">
										<a href="/" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
										<ul class="dropdown-menu">
											<li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
											<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
										</ul>
									</li>
									<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</header>
		)
	}
}

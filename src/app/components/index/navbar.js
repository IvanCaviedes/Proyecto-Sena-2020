import React, { Component } from 'react'

export default class navbar extends Component {
    render() {
        return (
            <div>
                <nav class="colorlib-nav" role="navigation">
                    <div class="top-menu">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-2">
                                    <div id="colorlib-logo"><a href="index.html">Stuff</a></div>
                                </div>
                                <div class="col-xs-10 text-right menu-1">
                                    <ul>
                                        <li class="active"><a href="index.html">Home</a></li>
                                        <li class="has-dropdown">
                                            <a href="blog.html">Blog</a>
                                            <ul class="dropdown">
                                                <li><a href="single.html">Blog Single</a></li>
                                                <li><a href="#">Video</a></li>
                                                <li><a href="#">Read</a></li>
                                                <li><a href="#">Lifestyle</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="event.html">Event</a></li>
                                        <li><a href="travel.html">Travel</a></li>
                                        <li><a href="about.html">About Me</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

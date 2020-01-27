import React, { Component } from 'react'

export default class slider extends Component {
    render() {
        return (
            <section class="feedback_area pad_bt">
        	<div class="container">
        		<div class="feedback_inner p_100">
        			<div class="row">
        				<div class="col-lg-5">
        					<div class="feedback_text">
        						<h3>Client’s Feedback</h3>
        						<p>Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderitin.</p>
        					</div>
        				</div>
        				<div class="col-lg-7">
							<div class="testi_slider_inner">
								<div class="testi_slider owl-carousel">
									<div class="item">
										<div class="media">
											<div class="d-flex">
												<img src="img/testimonials/testi-1.jpg" alt=""/>
											</div>
											<div class="media-body">
												<p>“Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker, projector, hardware”.</p>
												<h4>Mark Alviro Wiens</h4>
												<h5>CEO at Google</h5>
											</div>
										</div>
									</div>
									<div class="item">
										<div class="media">
											<div class="d-flex">
												<img src="img/testimonials/testi-1.jpg" alt=""/>
											</div>
											<div class="media-body">
												<p>“Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker, projector, hardware”.</p>
												<h4>Mark Alviro Wiens</h4>
												<h5>CEO at Google</h5>
											</div>
										</div>
									</div>
									<div class="item">
										<div class="media">
											<div class="d-flex">
												<img src="img/testimonials/testi-1.jpg" alt=""/>
											</div>
											<div class="media-body">
												<p>“Accessories Here you can find the best computer accessory for your laptop, monitor, printer, scanner, speaker, projector, hardware”.</p>
												<h4>Mark Alviro Wiens</h4>
												<h5>CEO at Google</h5>
											</div>
										</div>
									</div>
								</div>
							</div>
        				</div>
        			</div>
        		</div>
        	</div>
        </section>
        )
    }
}

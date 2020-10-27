import React, { Component } from "react";
import './Bronce.css';
import profileImage from '../images/jlavs.jpg';


export default class Bronce extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name : localStorage.getItem('name'),
      type : localStorage.getItem('type')
    };
  }
render() {
    return (
      <div>
      
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src={profileImage} alt="..." class="avatar-img rounded-circle"/>
						</div>
						<div class="info">
							<a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
								<span>
								{this.state.name}<br/>
									<span class="user-level">{this.state.type}</span>
									<span class="caret"></span>
								</span>
							</a>
							<div class="clearfix"></div>

							<div class="collapse in" id="collapseExample">
								<ul class="nav">
									<li>
										<a href="#profile">
											<span class="link-collapse">My Profile</span>
										</a>
									</li>
									<li>
										<a href="#edit">
											<span class="link-collapse">Edit Profile</span>
										</a>
									</li>
									<li>
										<a href="#settings">
											<span class="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<ul class="nav nav-primary">
						<li class="nav-item active">
							<a data-toggle="collapse" href="#dashboard" class="collapsed" aria-expanded="false">
								<i class="fas fa-home"></i>
								<p>Dashboard</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="dashboard">
								<ul class="nav nav-collapse">
									<li>
										<a href="../demo1/index.html">
											<span class="sub-item">Dashboard 1</span>
										</a>
									</li>
									<li>
										<a href="../demo2/index.html">
											<span class="sub-item">Dashboard 2</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
						
					</ul>
				</div>
			</div>
		</div>
		

		<div class="main-panel">
			<div class="content">
				<div class="panel-header bg-primary-gradient">
					<div class="page-inner py-5">
						<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
							<div>
								<h2 class="text-white pb-2 fw-bold">Dashboard</h2>
								<h5 class="text-white op-7 mb-2"></h5>
							</div>
						
						</div>
					</div>
				</div>
				<div class="page-inner mt--5">
					
					<div class="row">
						<div class="col-md-6">
							<div class="card">
								<div class="card-header">
									<div class="card-head-row">
										<div class="card-title">User Statistics</div>
										
									</div>
								</div>
								<div class="card-body">
									<iframe width="460" height="315"
src="https://octanks3bucket.s3.amazonaws.com/Bronze/Plyo1.avi">
</iframe>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="card">
								<div class="card-header">
									<div class="card-head-row">
										<div class="card-title">User Statistics</div>
										
									</div>
								</div>
								<div class="card-body">
								<iframe width="460" height="315"
src="https://octanks3bucket.s3.amazonaws.com/Bronze/Plyo2.avi">
</iframe>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>
			<footer class="footer">
				<div class="container-fluid">
					<div class="copyright ml-auto">
						<a>2020, Octank Productions, all right reserved</a>
					</div>				
				</div>
			</footer>
		</div>
      </div>
     );
  }

}
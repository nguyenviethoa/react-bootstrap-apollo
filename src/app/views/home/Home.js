// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { Carousel }   from 'react-bootstrap';
import {Jumbotron}    from '../../components';
import classnames     from 'classnames/bind';
import { Link }       from 'react-router-dom';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './home.scss';

// IMPORTANT: we need to bind classnames to CSSModule generated classes:
const cx = classnames.bind(styles);

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired
  };

  render() {
    return(
      <AnimatedView>
        {/* <Jumbotron> */}
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('./img/background.png')} />
            <Carousel.Caption>
              <h1 className="display-2">Closedeal</h1>
              <h3>Some marketing words</h3>
              <button type="button" className="btn btn-danger btn-lg">CONSUMER APP</button>
              <button type="button" className="btn btn-primary btn-lg">MERCHANT APP</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('./img/background3.png')} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src={require('./img/background2.png')} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

         {/* jumbotron */}
        <hr className="my-4"></hr> 
        <div className="container-fluid">
          <div className="row Jumbotron">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
              <p className="lead"> This is admin website for the Closedeal system. Closedeal is based on the honesty, trusty, loyalty. Some general words about Closedeal here.
              </p>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2">
              <a href="#"><button type="btn btn-outline-secondary btn-lg">Mobile Apps</button></a>
            </div>	
          </div>
        </div>

         {/* welcome section */}
        <hr className="my-4"></hr>
        <div className="container-fluid padding">
          <div className="row welcome text-center">
            <div className="col-12">
              <h1 className="display-4">Some title words here</h1>
            </div>
            <hr className="my-4"></hr>
            <div className="col-12">
              <p className="lead">More detail about how the Closedeal work</p>
            </div>
          </div>  		
        </div>    

           {/* 3 columns */}  
          <div className="container-fluid padding">
            <div className="row text-center padding">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <i className="fa fa-code"></i>
                <h3>Consumer App</h3>
                <p>some words about consumer app</p>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4">
                <i className="fa fa-bold"></i>
                <h3>Merchant App</h3>
                <p>some words about the merchant app</p>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-4">
                <i className="fa fa-mobile"></i>
                <h3>Admin website</h3>
                <p>some words about web app</p>
              </div>
            </div>  
          </div>		
          <hr className="my-4"></hr>

           {/* Two columns */}
          <div className="container-fluid padding">
            <div className="row padding">
              <div className="col-lg-6">
                <h2>Title for a special demontration here</h2>
                <p>detail about the demo</p>
                <a href="#" className="btn btn-primary">See More</a>
              </div>
              <div className="col-md-6">
                <img src={require('./img/desk.png')} className="img-fluid" />
              </div>	
            </div>
          </div>			
          <hr className="my-4" />
          
           {/* emotions */}
          <button className="fun" data-toggle="collapse" data-target="#emoji">click here will show some fun
          </button>
          <div id="emoji" className="collapse">
            <div className="container-fluid padding">
              <div className="row text-center">
                <div className="col-sm-6 col-md-3">
                  <img className="gif" src={require('./img/gif/panda.gif')} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <img className="gif" src={require('./img/gif/poo.gif')} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <img className="gif" src={require('./img/gif/unicorn.gif')} />
                </div>
                <div className="col-sm-6 col-md-3">
                  <img className="gif" src={require('./img/gif/chicken.gif')} />
                </div>
              </div>
            </div>
          </div>

           {/* Meet the team */}
          <div className="container-fluid padding">
            <div className="row welcome text-center">
              <div className="col-12">
                <h1 className="display-4">Meet the team</h1>
                <hr />
              </div>
            </div>
          </div>
          
          {/* cards meet the team */}
          <div className="container-fluid padding">
          <div className="row padding">
            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src={require('./img/team1.png')} />
                <div className="card-body">
                  <h4 className="card-title">Eddy Eddy</h4>
                  <p className="card-text">Manager</p>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                </div>	
              </div>	
            </div>

            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src={require('./img/team2.png')} />
                <div className="card-body">
                  <h4 className="card-title">John Jhon</h4>
                  <p className="card-text">Manager</p>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                </div>	
              </div>	
            </div>	

            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src={require('./img/team3.png')} />
                <div className="card-body">
                  <h4 className="card-title">Frank Frank</h4>
                  <p className="card-text">Developer</p>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                </div>	
              </div>	
            </div>	

            <div className="col-md-4">
              <div className="card">
                <img className="card-img-top" src={require('./img/team2.png')} />
                <div className="card-body">
                  <h4 className="card-title">Sophie Sophie</h4>
                  <p className="card-text">Designer</p>
                  <a href="#" className="btn btn-outline-secondary">See Profile</a>
                </div>	
              </div>	
            </div>		
          </div>	
        </div>
        <hr />

        {/* connect */} 
        <div className="container-fluid padding">
          <div className="row text-center padding">
            <div className="col-12">
              <h2>Connect</h2>
            </div>
            <div className="col-12 social padding">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-google-plus-g"></i></a>
              <a href="#"><i className="fa fa-instagram"></i></a>
              <a href="#"><i className="fa fa-youtube"></i></a>
            </div>	
          </div>
        </div>
        <hr />
        
        {/* footer */}
        <footer>
          <div className="container-fluid padding">
            <div className="row text-center">
              <div className="col-md-4">
                <hr className="light" />
                  <h5>Our Contact</h5>
                <hr className="light" />
                <p>434-434-233</p>
                <p>nguyenviethoa1984@gmail.com</p>
                <p>street</p>
                <p>city, state, country</p>
              </div>

              <div className="col-md-4">
                <hr className="light" />
                <h5>Our hours</h5>
                <hr className="light" />
                <p>434-434-233</p>
                <p>nguyenviethoa1984@gmail.com</p>
                <p>street</p>
                <p>city, state, country</p>
              </div>

              <div className="col-md-4">
                <hr className="light" />
                <h5>Our Location</h5>
                <hr className="light" />
                <p>434-434-233</p>
                <p>nguyenviethoa1984@gmail.com</p>
                <p>street</p>
                <p>city, state, country</p>
              </div>
              <div className="col-12">
                <hr className="light" /> 
                <h5>Closedeal logo here</h5>
              </div>	
            </div>
          </div>		
        </footer>							  
        {/* </Jumbotron> */}
      </AnimatedView>
    );
  }
}

export default Home;

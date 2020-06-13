import React from 'react'
import { Link } from 'gatsby'


import './footer.scss';

const partners = [
  'transparent-pvwc-logo.png',
  'cd-logo-navy.png',
  'cpda-logo.png',
  'embarc_color.png',
  'nywsa-logo.png',
  'thp_logo_vertical.png',
  'ofw-logo.png',
  'six-stacked-logo.png',
  'gpas-logo-black-web.png',
  'taglogo_ctr_blue60blk.png',
  'afscme-logo-only-2c_color.png',
  'naacp_sig_y-c.png',
  '4b.png',
  'black-redlogo-11.png',
  'little-lobbyists.png',
  'health-care-voter-logo-2-.jpg',
  'rootcircle_dk-brown.jpg',
  'tm-logo-green-background.png'
]

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer footer-container ">
        <div className="content has-text-centered  ">
          <div className="container">
            <div className="columns">
              <div className="column is-3">
                <section className="menu">
                  <ul className="menu-list">
                    <li><Link className="navbar-item" to="/contact">
                        <h4>Tell your story</h4>
                        </Link>
                    </li> 
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/terms-of-use">
                        Terms of Use
                      </Link>
                    </li>
                     <li>
                      <Link className="navbar-item" to="/privacy-policy">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
         
              <div className="column is-9">
                <h4>Partners</h4>
                {partners.map((logo) => 
                  (<img key={logo} alt={`partner logo: ${logo}`} className="partner-logo" src={`/img/${logo}`}/>)
                )}
                <h4>
                  For more COVID-19 stories visit <a href="https://shareyourcovidstory.com/">Be A hero's stories website</a>.
                </h4>
                <img key="be-a-hero-logo" className="partner-logo" alt="partner logo: be a hero" src="/img/be-a-hero-logo.png"/>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer

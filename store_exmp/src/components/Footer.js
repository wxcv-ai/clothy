import React from 'react';

function Footer() {
  return (
    <footer id="footer">


   
   

      <div className="header_top" style={{ background: '#e4e4e4' }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li>
                    <a href="#">
                      <i className="fa fa-phone"></i> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope"></i> info@domain.com
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <i className="fa fa-gps"></i> address : 
                    </a>
                  </li>
                </ul>
              </div>
            </div>
        
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <p className="pull-left">
              Copyright © 2013 E-SHOPPER Inc. All rights reserved.
            </p>
          
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

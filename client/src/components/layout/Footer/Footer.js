import React from "react";
import "./Footer.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

function Footer() {
  return (
    <footer>
      <Container maxWidth="lg">
          <Grid container columnSpacing={{ xs:2, sm: 2, md: 1 }}>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer_section">
                <h3>Follow us</h3>
                <ul>
                  <li>
                    We Love curating merchandise<br /> which you
                    would love to gift them.
                  </li>
                  <li className="social_links">
                    <BsFacebook fontSize="1.3em"/>
                    <BsInstagram fontSize="1.3em"/>
                    <BsTwitter fontSize="1.3em"/>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer_section">
                <h3>About Us</h3>
                <ul>
                  <li>Privacy Policy</li>
                  <li>Refund & Return Policy</li>
                  <li>Contact Us</li>
                  <li>Careers</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer_section">
                <h3>My Account</h3>
                <ul>
                  <li>Profile</li>
                  <li>My Orders</li>
                  <li>Shopping Cart</li>
                  <li>Track Your Order</li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer_section">
                <h3>Merchandise</h3>
                <ul>
                  <li>The Office</li>
                  <li>F.R.I.E.N.D.S</li>
                  <li>Games of Throne</li>
                  <li>Stranger Things</li>
                </ul>
              </div>
            </Grid>
          </Grid>
      </Container>
    </footer>
  );
}

export default Footer;

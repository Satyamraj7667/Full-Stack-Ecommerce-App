import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <div className="flex-container" style={{ backgroundColor: "#1b1c1b", flexDirection: "column" }}>

      <div className="first-row p-3" style={{ justifyContent: "space-around", display: "flex", flexWrap: "wrap", fontFamily: '"Roboto",sans-serif', color: "#bec2bf" }}>

        <div className="element" style={{ marginTop: "15px" }}>
          <div className="element-title" style={{ fontSize: "13px", marginBottom: "5px" }}>
            ABOUT
          </div>
          <div className="element-list" style={{ fontSize: "11px", fontWeight: "bold" }}>
            Contact us
            <br />
            About us
            <br />
            Careers
            <br />
            Tech Stack
          </div>
        </div>

        <div className="element" style={{ marginTop: "15px" }}>
          <div className="element-title" style={{ fontSize: "13px", marginBottom: "5px" }}>
            HELP
          </div>
          <div className="element-list" style={{ fontSize: "11px", fontWeight: "bold" }}>
            Payments
            <br />
            Shipping
            <br />
            Cancellations & Returns
            <br />
            FAQ
          </div>
        </div>

        <div className="element" style={{ marginTop: "15px" }}>
          <div className="element-title" style={{ fontSize: "13px", marginBottom: "5px" }}>
            CONSUMER POLICY
          </div>
          <div className="element-list" style={{ fontSize: "11px", fontWeight: "bold" }}>
            Term of Use
            <br />
            Security
            <br />
            Privacy
            <br />
            Sitemap
            <br />
            Grievance Redressal
          </div>
        </div>

        <div className="element" style={{ marginTop: "15px" }}>
          <div className="element-title" style={{ fontSize: "13px", marginBottom: "5px" }}>
            MAKE MONEY WITH US
          </div>
          <div className="element-list" style={{ fontSize: "11px", fontWeight: "bold" }}>
            Become an Affliate
            <br />
            Advertise Your Products
            <br />
            Grievance Redressal
          </div>
        </div>

       
      </div>

      <hr style={{ color: "white" }} />

      <div className="second-row p-1" style={{ display: "flex",justifyContent:"space-between", fontFamily: '"open-sans",sans-serif', color: "#bec2bf"}}>
        
        <div className="element-title" style={{ fontSize: "13px", marginBottom: "5px" }}>
        © 2024 GrabDeals, Inc. All rights reserved.
        </div>
        <div className="element-list" style={{ marginBottom:"5px",marginRight:"5px",width:"140px",display:"flex",justifyContent:"space-between" }}>
          <InstagramIcon href=""/>
          <XIcon/>
          <GitHubIcon/>
          <LinkedInIcon/>

        </div>

      </div>


    </div>
  )
}

export default Footer;
import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Avatar, Button } from "@mui/material";
import "./InstaEmbed.css";
function InstaEmbed() {
  return (
    <div className="instaEmbed">
      <img
        className="instaEmbed__image"
        src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
        alt=""
      />
      <div className="instaEmbed__text">
        <h4>Hello peeps 🙋</h4>
        <h4>Welcome to Instagram Clone App ⚡ !!!</h4>

        <p>
          Instagram is an American photo and video sharing social networking
          service owned by Facebook. This project is a Clone of the original
          Instagram UI. This Project provides some basic features, similar to
          the original application.
          <br />
          <br />
          <b>P.S.</b> This project has been developed for learning purposes, and
          it has nothing to do with the original Application.
          <br />
          <br />
          <b>Features : </b>
          <ul>
            <li>User Authentication : Sign In and Sign Up</li>
            <li>Image Uploading for creating new Posts</li>
            <li>User can add Comments to the Posts</li>
            <li>An Awesome User-Interface</li>
          </ul>
          <br />
        </p>
        <h4>
          Hope you have a great time, exploring the application in and out ✌
          !!!
        </h4>
      </div>
      <div className="instaEmbed__footer">
        <Avatar
          className="instaEmbed__avatar"
          alt="mayur"
          src="/images/avatar.jpg"
        />

        <div className="instaEmbed__footerContent">
          <h5 style={{ marginBottom: "5px" }}>Mayur Kumar</h5>
          <a href="https://www.instagram.com/mede_mayur/">
            <Button
              variant="contained"
              color="secondary"
              className="footer_follow"
            >
              Follow
            </Button>
          </a>
        </div>
      </div>
      <div className="instaEmbed__footerCopyright">
        <CopyrightIcon
          fontSize="small"
          className="instaEmbed__footerCopyrightIcon"
        />
        2022 INSTAGRAM-CLONE BY MAYUR KUMAR
      </div>
    </div>
  );
}

export default InstaEmbed;

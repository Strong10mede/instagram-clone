import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
function Post({ caption, imageUrl, username }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
      </div>
      <h3>{username}</h3>
      <img className="post__image" alt="" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong>:{caption}
      </h4>
    </div>
  );
}

export default Post;

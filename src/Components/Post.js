import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
function Post({ caption, imageUrl, username, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  // What follows is for comments under a post, when a change is made, it refreshes
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);
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

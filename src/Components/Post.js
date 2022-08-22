import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import firebase from "firebase";
import "./Post.css";
import { TextField } from "@mui/material/";
import { Avatar } from "@mui/material";
function Post({ caption, user, imageUrl, username, postId }) {
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
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" alt="" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong>:{caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <div className="comment_container">
            <p className="post__comment ">
              <strong> {comment.username}:</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
      {user && ( // Only display this comment form input if the user has logged in
        <form className="post__commentBox">
          <TextField
            className="post__input"
            type="text"
            placeholder={"Add a comment"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="post__button"
            disable={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Components/Post";
import { db, auth } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import ImageUpload from "./Components/ImageUpload";
import HomeIcon from "@mui/icons-material/Home";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

// function backToTop() {
//   document.body.scrollTop = 0; //for Safari
//   document.documentElement.scrollTop = 0; //for Chrome, Firefox, IE and Opera
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "600px",
  width: "50%",
  minWidth: "200px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  // const [lang, setLang] = useState(locale);

  // this to to toggle from FR to EN
  // const toggleLang = () => setLang(!lang);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if user logged in..
        console.log(authUser);
        setUser(authUser);
      } else {
        //if user logged out..
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup action
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    console.log(db.collection("posts"));
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    //close modal
    setOpen(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    //close modal
    setOpenSignIn(false);
  };

  // function home() {
  //   setViewMine(false);
  //   setViewWhichUser("");
  //   setViewSinglePost(false);
  //   // backToTop();
  // }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <center className="app__signup">
              <img
                className="app__headerImage"
                src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                width="75"
                style={{ margin: "auto" }}
                alt=""
              />
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup__input"
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup__input"
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup__input"
              />
              <Button
                onClick={signUp}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Sign Up
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <center className="app__signin">
              <img
                className="app__headerImage"
                src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                width="75"
                style={{ margin: "auto" }}
                alt=""
              />
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup__input"
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup__input"
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup__input"
              />
              <Button
                onClick={signIn}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Sign In
              </Button>
            </center>
          </form>
        </Box>
      </Modal>
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
          width="75"
          alt=""
        />
        <div className="header_icons">
          <HomeIcon fontSize="large" className="header_icon" />
          <NearMeOutlinedIcon fontSize="large" className="header_icon" />
          <ExploreOutlinedIcon fontSize="large" className="header_icon" />
          <FavoriteBorderOutlinedIcon
            fontSize="large"
            className="header_icon"
          />
        </div>
        <div className="signupButton">
          {user ? (
            <Button
              onClick={() => auth.signOut()}
              variant="contained"
              color="secondary"
              className="signOutButton"
            >
              Logout
            </Button>
          ) : (
            <div className="app__loginContainer">
              <Button
                onClick={() => setOpenSignIn(true)}
                className="signInButton"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setOpen(true)}
                variant="contained"
                color="secondary"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id} //with the help of key react will know which post is added or changed and will only render that post
              username={post.username}
              postId={id}
              user={user}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight"></div>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to Login to Upload</h3>
      )}
    </div>
  );
}

export default App;

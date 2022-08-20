import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Components/Post";
import { db, auth } from "./firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import ImageUpload from "./Components/ImageUpload";
import InstagramEmbed from "react-instagram-embed";
// function backToTop() {
//   document.body.scrollTop = 0; //for Safari
//   document.documentElement.scrollTop = 0; //for Chrome, Firefox, IE and Opera
// }

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Spinner = () => (
  <div className="post loading">
    <img alt="Loading..." src="https://i.gifer.com/ZZ5H.gif" width="20" />
    <h5>Loading...</h5>
  </div>
);

//determine language from the user's computer or browser
// const locale = () => {
//   if (getUserLocale().includes("fr")) {
//     return true;
//   }
//   else
//     return false;
// }

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [viewMine, setViewMine] = useState(false);
  const [viewWnichUser, setViewWhichUser] = useState("");
  const [viewSinglePost, setViewSinglePost] = useState(false);
  const [singlePostId, setSinglePostId] = useState("");
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
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>Sign Up</Button>
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
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signIn}>Sign In</Button>
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
        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id} //with the help of key react will know which post is added or changed and will only render that post
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://instagr.am/p/CAX8psZMEdL_Lkto_rA_8oIhfVE1IJNLUobpkc0/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
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

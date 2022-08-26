import React from "react";
import { Avatar, Button } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Suggestion.css";
function Suggestion() {
  return (
    <div className="suggestion">
      <h4>
        {" "}
        <InstagramIcon className="suggestion__icon" /> Suggestions For You
      </h4>
      <p>
        Sed ut perspiciatis unde omnis iste natus err sit voluptatem iste natus
        error sit voluptatem{" "}
      </p>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="Bhuban_Bam"
          src="https://mumbaimirror.indiatimes.com/photo/68636148.cms"
        />

        <div className="suggestion__footerContent">
          <h5>bbkivines_</h5>
        </div>
        <a
          href="https://www.instagram.com/bbkivines_/"
          className="suggestion__footerFollow"
        >
          <Button
            size="small"
            //   variant="contained"
            color="secondary"
          >
            Follow
          </Button>
        </a>
      </div>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="sahidkapoor4"
          src="https://www.filmibeat.com/img/popcorn/profile_photos/shahid-kapoor-20190619173815-177.jpg"
        />

        <div className="suggestion__footerContent">
          <h5>sahidkapoor4</h5>
        </div>
        <a
          href="https://www.instagram.com/sahidkapoor4/"
          className="suggestion__footerFollow"
        >
          <Button
            size="small"
            //   variant="contained"
            color="secondary"
          >
            Follow
          </Button>
        </a>
      </div>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="shirleysetia
          "
          src="https://m.media-amazon.com/images/M/MV5BMjMwZjhjOTUtNmVjNS00NTM1LWEwOTItN2ZlMzMwMGY5ZGQ2XkEyXkFqcGdeQXVyNDAzNDk0MTQ@._V1_.jpg"
        />

        <div className="suggestion__footerContent">
          <h5>shirleysetia</h5>
        </div>
        <a
          href="https://www.instagram.com/shirleysetia/"
          className="suggestion__footerFollow"
        >
          <Button
            size="small"
            //   variant="contained"
            color="secondary"
          >
            Follow
          </Button>
        </a>
      </div>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="durjoydatta"
          src="https://images.newindianexpress.com/uploads/user/imagelibrary/2018/12/19/original/accidental.jpg"
        />

        <div className="suggestion__footerContent">
          <h5>durjoydatta</h5>
        </div>
        <a
          href="https://www.instagram.com/durjoydatta/"
          className="suggestion__footerFollow"
        >
          <Button size="small" color="secondary">
            Follow
          </Button>
        </a>
      </div>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="cristiano"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuZfZq9tllEgk_3z9bFGx-NLTS2vRcpSdB0Q&usqp=CAU"
        />

        <div className="suggestion__footerContent">
          <h5>cristiano</h5>
        </div>
        <a
          href="https://www.instagram.com/cristiano/"
          className="suggestion__footerFollow"
        >
          <Button size="small" color="secondary">
            Follow
          </Button>
        </a>
      </div>

      <div className="suggestion__footer">
        <Avatar
          className="suggestion__avatar"
          alt="gameofthrones"
          src="https://www.skinillustrator.com/wp-content/uploads/2018/09/got-logo.jpg"
        />

        <div className="suggestion__footerContent">
          <h5>gameofthrones</h5>
        </div>
        <a
          href="https://www.instagram.com/gameofthrones/"
          className="suggestion__footerFollow"
        >
          <Button size="small" color="secondary">
            Follow
          </Button>
        </a>
      </div>
      <center style={{ marginTop: "5px" }}>
        <a href="https://www.instagram.com/">
          <Button
            size="small"
            color="primary"
            className="suggestion__footerFollowMain"
          >
            See All
          </Button>
        </a>
      </center>
    </div>
  );
}

export default Suggestion;

import React from 'react';
import './styles.css'; // Import your CSS file

const LawyerCard2 = ({ name, groupName, joinedDate, position, location, awards, matches, pals, coffee }) => {
  return (
    <div className="center">
      <div className="laweryCard">
        <div className="additional">
          <div className="user-card">
            <div className="level center">
              Level 13
            </div>
            <div className="points center">
              5,312 Points
            </div>
            <svg width="110" height="110" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc" className="center">
              <title id="title">Teacher</title>
              <desc id="desc">Cartoon of a Caucasian woman smiling, and wearing black glasses and a purple shirt with white collar drawn by Alvaro Montoro.</desc>
              <style>
                {`
                  .skin { fill: #eab38f; }
                  .eyes { fill: #1f1f1f; }
                  .hair { fill: #2f1b0d; }
                  .line { fill: none; stroke: #2f1b0d; stroke-width:2px; }
                `}
              </style>
              {/* SVG Paths and Shapes */}
            </svg>
          </div>
          <div className="more-info">
            <h1>{name}</h1>
            <div className="coords">
              <span>{groupName}</span>
              <span>Joined {joinedDate}</span>
            </div>
            <div className="coords">
              <span>{position}</span>
              <span>{location}</span>
            </div>
            <div className="stats">
              <div>
                <div className="title">Awards</div>
                <i className="fa fa-trophy"></i>
                <div className="value">{awards}</div>
              </div>
              <div>
                <div className="title">Matches</div>
                <i className="fa fa-gamepad"></i>
                <div className="value">{matches}</div>
              </div>
              <div>
                <div className="title">Pals</div>
                <i className="fa fa-group"></i>
                <div className="value">{pals}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="general">
          <h1>{name}</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
          <span className="more">Mouse over the card for more info</span>
        </div>
      </div>
    </div>
  );
}

export default LawyerCard2;

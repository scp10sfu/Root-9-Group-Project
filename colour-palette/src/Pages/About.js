import React, {useState} from "react";
import Layout from '../Components/Layout';
import './About.css'; // This imports the CSS file directly, no 'styles' object is created

function About () {
    const [backgroundStyle, setBackgroundStyle] = useState({});

    return (
        <div className="ColourExtractor" style={backgroundStyle}>
            <div className="background">
                {Array.from({ length: 20 }, (_, i) => (
                    <span key={i} style={{ color: `var(--color${i + 1})` }}></span>
                ))}
            </div>

            <section id="about">
      <p class="section__text__p1">Get To Know More</p>
      <h1 class="title">About Us</h1>
      <div class="section-container">
      <div class="section__pic-container2">
  <img
    src="lufy.gif"
    alt="paleta"
    class="about-pic"
  />
</div>
        <div class="about-details-container">
          <div class="about-containers">
            <div class="details-container">
              <img
                src="/Root-9-Group-Project/colour-palette/public/paleta.png"
                alt="Education icon"
                class="icon"
              />
              <h3>Education</h3>
              <h4>Simon Frasier University</h4>
              <p>B.Sc. Computer Science - 2026 grad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
}

export default About;

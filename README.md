# 🎨 Paletä: Unleash Color Creativity! 🌈

[![Netlify Build Status](https://api.netlify.com/api/v1/badges/4c366889-27a9-4dd6-b40f-b30a9a022862/deploy-status)](https://mypaleta.netlify.app/)
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m795784458-8d1674ba3b95c4e625503e31)

🔗 **Dive into Paletä**: [Visit Our Website](https://mypaleta.netlify.app/)

📹 **Check Out Our Debut**: [Watch Our First Presentation](https://drive.google.com/file/d/1D5xowmShwgpPiy_jJseGULDg8wyn9yxM/view?usp=sharing)

🔗 **Contribute on GitHub**: [Paleta Server Repository](https://github.com/scp10sfu/Paleta-Server)

---

## 📚 Table of Contents 📚

- 🌟 Description
- 📁 File and Folder Explanations
- 💻 Tech Stack
- 📦 Dependencies
- 🚀 How to Use
- 👥 Meet the Team

---

## 🌟 Description

Welcome to **Paletä**, where colors come to life! Whether you're a design enthusiast, a digital artist, or just someone who loves playing with colors, Paletä is your perfect companion for exploring and creating stunning color palettes.

### What Makes Paletä Special?

- **Image-Based Palette Magic**: Upload your favorite image and watch as Paletä transforms it into a mesmerizing color palette. Tailor the palette to your taste by adjusting the number of colors and exploring different formats like RGB, Hex, and CMYK. It's like having a color wizard at your fingertips!
- **AI-Powered Palette Adventures**: Have an idea but no image? No problem! Type in your concept, and our AI, powered by the magic of OPENAI, will conjure a palette that's uniquely yours. It's like a color journey guided by your imagination!

### For Everyone, Everywhere

Paletä is crafted for all - from beginners taking their first steps in color theory to professionals seeking the perfect shade for their next masterpiece. It's more than a tool; it's a gateway to a world where colors bring ideas to life.

---

Eager to start your color journey? Jump right into Paletä and let your creativity flow in a spectrum of colors!

There you have it! A more vibrant and exciting README to match the energy of Paletä. Feel free to adjust any section to better fit your project's personality and details.

## 📖 Explanation of files and folders

The main folders for this project thus far are

- workflows
- colour-palette
- node_modules
- project-plan-files

Workflows simply houses the workflow used for testing and with Github Actions. The workflow file consists of installing dependencies, and running the testing command we use, which is npm test, running all test files of the format .test.js. The actual test files are stored in colour-palette/src/Tests.

Colour-palette has all of the main web application files. Each of the folders and files have purposes as follows:

- **/public** is a folder holding some static images and other static files which are used throughout the program. These files are able to be referenced starting from the base url, making them simple and easy to reference.
- **/src** is a folder storing almost all of the code of the web application.
- **package-lock.json** is a json file specifiying the package requirements, more specifically the dependices and locking the versions of the packages.
- **package.json** is a json file specifying the package requirements, more specifically the package names and the desired version of the package.

The src folder is one of the more important folders in this web application, so further specification on the files in src will be given here:

- **/Components** is a folder holding main components that have the functionality of the code.
- **/Pages** is a folder holding the main pages you can navigate around on the web application.
- **/images** is a folder holding various images used throughout the project.
- **App.js / App.css** is the code for the main web application file and the styling file that is used for it's user interface.

The project-plan-files folder will have all the files related to milestone 1, which is the initial project planning phase. Each file's purpose/meaning is as follows:

- **DFD.png** is an image which shows the Data Flow Diagram created to represent a potential users process through using our web application.
- **Root9_Presentation_Slides.pdf** is a pdf with the slides used in the first presentation.
- **Root9_Project_Report.pdf** is a pdf with the first report for milestone one.
- **Root9_WBS.xlsx** is an excel file with the Work Breakdown Structure.
- **Root_9 Final Timeline.pdf** is a pdf file with the timeline/schedule of our project.
- **Root_9 Final Timeline.xlsx** is the excel format of the timeline/schedule of our project.
- **Milestone_1_AI_Disclosure_Root_9_Taiga_Okuma_301594583.pdf** is a pdf file for AI use disclosure.

The final-submission-files folder will have all the files related to milstone 2, which is the final submission phase. Each file's purpose/meaning is as follows:

- **DFD.png** is an image which shows the Data Flow Diagram created to represent a potential users process through using our web application.
- **Root9_Presentation_Slides.pdf** is a pdf with the slides used in the final presentation.
- **Root9_Presentation_Slides.pptx** is the powerpoint format of the final presentation of our project.
- **Root9_Project_Report.pdf** is a pdf with the final report.
- **Project_Milestone_2_Stefan_Pricope_301462068_AI Use Disclosure.pdf** is a pdf file for AI use disclosure.
- **Milestone_2_AI_Disclosure_Root_9_Taiga_Okuma_301594583.pdf** is a pdf file for AI use disclosure.

Files associated with the server (AI parts) of the website are found in the github repository mentioned at the start of the README

### Project Structure

<pre>
.
│
└── colour-palette
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── ...
    ├── src
    │   ├── images
    │   ├── Pages
    │   │   └── Tests
    │   └── Components
    │       └── Tests
    │  
    │  
    │
    └── docs
        └── ...
</pre>

## 🔧 Tech stack

#### Frontend:

- HTML, CSS, JavaScript

#### Framework:

- REACT

#### External APIs:

- ColorAPI
- OpenAIAPI

## Usage

This usage will describe a setup process for the static elements of our web application. Usage of the AI components is unavaliable on local machines.

Once Node.js is installed, run these two commands in the colour-palette directory with your terminal.

```
npm ci
npm run build
```

## 💡 Contributors

- Anna Rusinova ([@arusinova](https://github.com/arusinova))
- Stefan Pricope ([@scp10sfu](https://github.com/scp10sfu))
- Taiga Okuma ([@SunIsDark](https://github.com/SunIsDark))
- Cindy Xiao ([@CindyXiao1](https://github.com/CindyXiao1))

Commits done on github are visible in #github-changelog on discord.

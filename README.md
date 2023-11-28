# 🎨 paletä 🖌️

[![Netlify Build Status](https://api.netlify.com/api/v1/badges/4c366889-27a9-4dd6-b40f-b30a9a022862/deploy-status)](https://root9colourpalette.netlify.app/)
![Uptime Robot status](https://img.shields.io/uptimerobot/status/m795784458-c193d64b3bfad2411497c863%20)

Paleta is a web application that allows you to obtain color palettes from user uploaded images or AI generated prompts.

Website Link: https://root9colourpalette.netlify.app/

Our first presentation video link: https://drive.google.com/file/d/1D5xowmShwgpPiy_jJseGULDg8wyn9yxM/view?usp=sharing

Github Server Repository: https://github.com/scp10sfu/Paleta-Server

## 📄 Table of contents 📄

- [Description](https://github.com/scp10sfu/Root-9-Group-Project#-description)
- [Explanation of files and folders](https://github.com/scp10sfu/Root-9-Group-Project#-explanation-of-files-and-folders)
- [Tech stack](https://github.com/scp10sfu/Root-9-Group-Project#-tech-stack)
- [Dependencies](https://github.com/scp10sfu/Root-9-Group-Project#-dependencies)
- [Usage](https://github.com/scp10sfu/Root-9-Group-Project#usage)
- [Contributors](https://github.com/scp10sfu/Root-9-Group-Project#-contributors)

## 🚀 Description

As described above, Paleta is here to be your companion in making color palettes! There are two main features that comes with Paleta.

1. Palettes generated from user uploaded images
2. Palettes generated from using AI prompts.

Users are able to upload their own images to the site using our standard image processing tools, and once the image has been uploaded Paleta will give color palette suggestions based on the most common colors found in the image. The user is able to change the number of colors that they wish to have and can see the colors with many different formats. These formats include the color name, RGB, Hex, and YCYK value. The user is able to easily copy these values to be used for other purposes which the user could need.

Alternatively users can use the palette generator utilizing powerful OPENAI prompts. The user can input what idea they have and the generator will provide a color palette customized for the users prompt. Similarily to the image based palette generator, the user can customize the number of colors they wish to extract from their prompt, as well as seeing the colors in a variety of formats.

Paleta provides easy access into color palette generation for both beginner and advanced users. Whether you need colors for recreational or work usage, Paleta will be able to assist you with a variety of needs.

## 📖 Explanation of files and folders.

The main folders for this project thus far are

- workflows
- colour-palette
- node_modules
- project-plan-files

Workflows simply houses the workflow used for testing and with Github Actions. The workflow file consists of installing dependencies, and running the testing command we use, which is npm test, running all test files of the format .test.js. The actual test files are stored in colour-palette/src/Tests.

Colour-palette has all of the main web application files. Each of the folders and files have purposes as follows:

- **/docs** is a folder housing nothing?
- **/public** is a folder holding some static images and other static files which are used throughout the program. These files are able to be referenced starting from the base url, making them simple and easy to reference.
- **/src** is a folder storing almost all of the code of the web application.
- **package-lock.json** is a json file specifiying the package requirements, more specifically the dependices and locking the versions of the packages.
- **package.json** is a json file specifying the package requirements, more specifically the package names and the desired version of the package.
- **setup.sh** is a script to install all the dependencies needed to run the web application your your local computer.

The src folder is one of the more important folders in this web application, so further specification on the files in src will be given here:

- **/Components** is a folder holding main components that have the functionality of the code.
- **/Pages** is a folder holding the main pages you can navigate around on the web application.
- **/Tests** is a folder holding the files used specifically for testing.
- **/images** is a folder holding various images used throughout the project.
- **App.js / App.cs** is the code for the main web application file and the styling file that is used for it's user interface.
- **index.css / index.js** is a script to install all the dependencies needed to run the web application your your local computer.

The project-plan-files folder will have all the files related to milestone 1, which is the initial project planning phase. Each file's purpose/meaning is as follows:

- **DFD.png** is an image which shows the Data Flow Diagram created to represent a potential users process through using our web application.
- **Root9_Presentation_Slides.pdf** is a pdf with the slides used in the first presentation.
- **Root9_Project_Report.pdf** is a pdf with the first report for milestone one.
- **Root9_WBS.xlsx** is an excel file with the Work Breakdown Structure.
- **Root_9 Final Timeline.pdf** is a pdf file with the timeline/schedule of our project.
- **Root_9 Final Timeline.xlsx** is the excel format of the timeline/schedule of our project.
- **Milestone_1_AI_Disclosure_Root_9_Taiga_Okuma_301594583.pdf** is a pdf file for AI use disclosure.

Files associated with the server (AI parts) of the website are found in the github repository mentioned at the start of the README

<H3> Project Structure </H3>

<pre>
.
│
└── colour-palette
    ├── README.md
    ├── public
    │   └── ...
    ├── src
    │   ├── images
    │   └── pages
    │   └── components
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
- OpenAI

## Usage

[The usage should be here]

## 💡 Contributors

- Anna Rusinova ([@arusinova](https://github.com/arusinova))
- Stefan Pricope ([@scp10sfu](https://github.com/scp10sfu))
- Taiga Okuma ([@SunIsDark](https://github.com/SunIsDark))
- Cindy Xiao ([@CindyXiao1](https://github.com/CindyXiao1))

Commits done on github are visible in #github-changelog on discord.

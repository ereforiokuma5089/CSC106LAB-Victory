# CSCLAB-Victory

Ereforiokuma Victory — Student Portfolio Website
A responsive, five-page student portfolio and academic management website developed for the COS 106 Introduction to Web Technologies LAB assessment. The site showcases selected web projects, provides an interactive academic planner, and demonstrates client-side contact form validation.

Pages and features
Page	File	What it contains
Home	index.html	Welcome section, profile photograph, biography, navigation, and links to other pages.
About Me	about.html	Education, career aspirations, skills, interests, an HTML skills table, and a video walkthrough.
Projects	projects.html	Three featured projects, descriptions, screenshots, and links to live websites.
Academic Planner	planner.html	Add, complete, and delete tasks; set due dates and priorities; filter tasks; view task statistics.
Contact	contact.html	Name, email, phone, and message fields with JavaScript validation and a submission confirmation popup.


Featured projects
- TaskBloom — A productivity and task management website with task and calendar interfaces. View TaskBloom
- Valuta — A currency conversion website with converter and currency-watchlist interfaces. View Valuta
- ToryMac — An e-commerce and preorder website featuring a product catalogue and product details. View ToryMac
Technologies used
- HTML5: Semantic page structure, navigation, forms, table, images, and the HTML5 video player.
- CSS3: External stylesheet, responsive layouts, Flexbox/Grid, visual styling, and transitions.
- JavaScript: Event handling, form validation, DOM manipulation, arrays, task filtering, and browser storage.
- Browser localStorage: Stores planner tasks on the visitor's device; no backend is used.

Interactive functionality
Academic Planner
The planner JavaScript is in js/planner.js. Users can create tasks with a title, due date, and priority; mark tasks as completed; remove tasks; and switch between task filters. JavaScript updates the displayed task list and the total, pending, and completed counts. The tasks are saved in the browser using localStorage and loaded again when the page is revisited. Data is local to that browser and device.
Contact form
The contact form JavaScript is in js/contact.js. It checks that the name, email, phone number, and message are filled in, checks email formatting, and restricts the phone input to digits. Invalid submissions display field-specific errors. After valid submission, the page displays the browser popup “Form submitted!” and returns the visitor to the homepage. This is a demonstration form: it does not send or store messages.
Multimedia
The About Me page contains an HTML5 video player with playback controls. It plays assets/videos/MyPortfolio.mp4, a screen recording demonstrating the website's functionality.
Project structure
cos106-victory/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── planner.js
│   └── contact.js
└── assets/
    ├── images/
    │   ├── ev-logo.png
    │   ├── profile.jpeg
    │   └── [six project screenshots]
    └── videos/
        └── MyPortfolio.mp4


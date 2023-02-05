# Landing Page Project with JavaScript

## Table of Contents

This project aims to give you real-world scenarios of manipulating the DOM. The functionality you will be using serves two purposes: to prepare you for appending dynamically added data to the DOM, and to show you how javascript can improve the usability of an otherwise static site. This project barely touches the surface of what is possible, but it does use some incredibly common events, methods, and logic.

For this project, refactor and test as much as possible while you are building. You should figure for every piece of functionality you add, you will likely spend just as much time testing and refactoring your code. If it takes you 3 hours to figure out the logic, it should likely take you another 3 hours determining that you wrote the best code possible. As your skills improve, this process will feel more natural. Make sure to remove any debugging code from your final submission.

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

1. Start by linking your app.js.
2. Build out your HTML and at least 3 content sections.
3. Build the navigation menu.
4. Add functionality to distinguish the section in view. 
5. Add the functionality to scroll to sections.
6. REFACTOR.
7. Add additional sections to your HTML document.
8. Test the performance. 

## Specifications

### Interface and Architecture

| CRITERIA | MEETS SPECIFICATIONS |
| -------- | ------------------   |
| Architecture| The project should have a structure like the one shown below. All files shown must be present and the app must successfully render a home page with clear design and functionality added when index.html is loaded in the browser. No errors should display in console. |
| Usability | All features are usable across modern desktop, tablet, and phone browsers |
| Styling | Styling has been added for active states. |
| HTML Structure | There are at least 4 sections that have been added to the page.|

### Landing Page Behavior

| CRITERIA | MEETS SPECIFICATIONS |
| -------- | ------------------   |
| Navigation | Navigation is built dynamically as an unordered list.|
| Section Active State | It should be clear which section is being viewed while scrolling through the page.|
| Scroll to Anchor | When clicking an item from the navigation menu, the link should scroll to the appropriate section.|

### Documentation

| CRITERIA | MEETS SPECIFICATIONS |
| -------- | ------------------   |
| README | The ReadMe file should have non-default text in it that is specific to this project. It doesn’t have to be thorough, but should have some basic information, and use correct markdown.|
| Comments | Comments are present and effectively explain longer code procedure when necessary.|
|Code Quality| Code is formatted with consistent, logical, and easy-to-read formatting as described in the Udacity JavaScript Style Guide.|

### Suggestions

- Add an active state to your navigation items when a section is in the viewport.
- Hide fixed navigation bar while not scrolling (it should still be present on page load).
    - Hint: setTimeout can be used to check when the user is no longer scrolling.
- Add a scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.
- Update/change the design/content.
- Make sections collapsible.


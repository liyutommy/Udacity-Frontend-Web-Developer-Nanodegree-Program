/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const header = document.querySelector("header");
const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * Functions
 * 
*/

/* Navigation Menu */

// Create navigation Menu
function createNavMenu() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < sections.length; i++) {
    const newListItem = document.createElement("li");
    // Get each section's heading and id
    let sectionTitle = sections[i].firstElementChild.firstElementChild.textContent;
    let sectionId = sections[i].id;
    // Set href as an anchor link
    newListItem.innerHTML = `<a href=#${sectionId} class="menu__link"> ${sectionTitle} </a>`;
    fragment.appendChild(newListItem);
  }
  navList.appendChild(fragment);
}
createNavMenu();

// Scroll to specifc section by clicking corresponding navigation menu button
function navPointToSection() {
  // Array.from() method to convert the HTMLCollection to an Array
  Array.from(navList.children).forEach(link => {
    // FirstElementChild is hyperlink (<a></a>)
    link.firstElementChild.addEventListener("click", function (event) {
      // Prevent the default action
      event.preventDefault();
      // Get specific section object (this -> hyperlink)
      const linkAnchor = document.querySelector(this.getAttribute("href"));
      // Scrolls the element's ancestor containers such that the element 
      // on which scrollIntoView() is called is visible to the user.
      linkAnchor.scrollIntoView({
        // transition animation
        behavior: "smooth",
        // vertical alignment
        block: "center",
      });
    });
  });
}
navPointToSection();

// Differentiate padding size between mobile and desktop
// Add padding at the top of page when users use mobile
function resizeWindow() {
  window.addEventListener("resize", () => {
    // get header's height
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
  });
}
resizeWindow();


/* Sections */

// Get which section is in the viewport 
function sectionInViewPort(sectionList) {
  // Get a DOMRect object providing information about the size of an element and its position relative to the viewport.
  sections.forEach((element) => { sectionList.push(element.getBoundingClientRect().top + 100) });
  // Return the index of the first element in an array that satisfies the provided testing function
  return sectionList.findIndex((element) => { return element > 0 });
}

// Change navigation menu button color background when scrolling on the specific section
function scrollDownToSection() {
  window.addEventListener("scroll", () => {
    sectionsPosition = [];
    // Get the current active section's index
    activeSectionIndex = sectionInViewPort(sectionsPosition);
    for (const [index, section] of sections.entries()) {
      let linkAnchor = document.querySelector(`a[href="#${section.id}"]`);
      if (index == activeSectionIndex) {
        // Section element adds shadowing background
        section.classList.add("your-active-class");
        // Set header link to green
        linkAnchor.setAttribute("style", "font-weight: bold; color: rgb(136,203,171);");
      } else {
        section.classList.remove("your-active-class");
        linkAnchor.removeAttribute("style");
      }
    }
  });
}
scrollDownToSection();


/* Top Button */

function topButton() {
  document.querySelector("button").addEventListener("click", () => {
    // Scroll to the top of webpage
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
topButton();




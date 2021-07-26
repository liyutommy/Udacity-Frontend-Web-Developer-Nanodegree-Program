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
function navMenu() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < sections.length; i++) {
        const newListItem = document.createElement("li");
        // Get each section's heading
        let sectionTitle = sections[i].firstElementChild.firstElementChild.textContent;
        let sectionId = sections[i].id;
        newListItem.innerHTML = `<a href=#${sectionId} class="menu__link"> ${sectionTitle} </a>`;
        fragment.appendChild(newListItem);
    }
    navList.appendChild(fragment);
}
navMenu();

// Scroll to specifc section by clicking corresponding navigation menu button
function navPointToSection(){
    // Array.from() method to convert the HTMLCollection to an Array
    Array.from(navList.children).forEach(link => {
        // firstElementChild is hyperlink
        link.firstElementChild.addEventListener("click", function(event){
            // prevent the default action
            event.preventDefault();
            // get specific section object
            const linkAnchor = document.querySelector(this.getAttribute("href"));
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
function resizeWindow(){
    window.addEventListener("resize", () => {
        // get header's height
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    });
}
resizeWindow();

/* Sections */

// get which section is in the viewport 
function sectionInViewPort(sectionList){
    sections.forEach((element) => {sectionList.push(element.getBoundingClientRect().top+100)});
    return sectionList.findIndex((element) => {return element > 0});
}

// change navigation menu button color background when scrolling on the specific section
function scrollDownToSection(){
    window.addEventListener("scroll", ()=> {
        sectionsPosition = [];
        activeSectionIndex = sectionInViewPort(sectionsPosition);
        for(const [index, section] of sections.entries()){
            let linkAnchor = document.querySelector(`a[href="#${section.id}"]`);
            if(index == activeSectionIndex){
                section.classList.add("your-active-class");
                linkAnchor.setAttribute("style", "font-weight: bold; color: rgb(136,203,171);");
            } 
            else{
                section.classList.remove("your-active-class");
                linkAnchor.removeAttribute("style");
            }
        }
    });
}
scrollDownToSection();


/* Top Button */

function topButton(){
    document.querySelector("button").addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}
topButton();




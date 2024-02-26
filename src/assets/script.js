const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const selectWith = (p, e) => p.querySelector(e);
const selectAllWith = (p, e) => p.querySelectorAll(e);
const create = (e) => document.createElement(e);
const root = (e) => getComputedStyle(select(":root")).getPropertyValue(e);
const getStyle = (e, style) => window.getComputedStyle(e)[style];
 const preventDefault = (event) => event.preventDefault();

const sideLinks = selectAll('.sidebar .side-menu li ');
console.log(sideLinks.parentElement)
sideLinks.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all elements
        sideLinks.forEach(item => {
            item.classList.remove('active');
        });
        // Add 'active' class to clicked element
        item.classList.add('active');
    });
});
// sideLinks.forEach((e) => {
//     const li = e.parentElement;
//         e.addEventListener("click", () => {
//         li.forEach( item => item.parentElement.classList.remove('active'));
//     })
//     li.classList.add('active');
// });

//  element variables
const menu = select('.content nav .fas .fa-bars ');
const sideBar = select('.sidebar');

menu.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});








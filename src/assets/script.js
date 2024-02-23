const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const selectWith = (p, e) => p.querySelector(e);
const selectAllWith = (p, e) => p.querySelectorAll(e);
const create = (e) => document.createElement(e);
const root = (e) => getComputedStyle(select(":root")).getPropertyValue(e);
const getStyle = (e, style) => window.getComputedStyle(e)[style];
 const preventDefault = (event) => event.preventDefault();

const sideLinks = selectAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach((e) => {
    const li = e.parentElement;
    console.log(li)
    e.addEventListener("click", () => {
        sideLinks.forEach(item => item.parentElement.classList.remove('active'));
    })
    li.classList.add('active');
});

//  element variables
const menu = select('.content nav .bx.bx-menu ');
const sideBar = select('.sidebar');

menu.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = select('.content nav form .form-input button');
const searchBtnIcon = select('.content nav form .form-input button .bx');
const searchForm = select('.content nav form ');

searchBtn.addEventListener('click', (e) => {
    window.innerWidth < 576 ? e.preventDefault() : null;
    searchForm.classList.toggle('show');
    searchForm.classList.contains('show') ? searchBtnIcon.classList.replace('bx-search', 'bx-x') : searchBtnIcon.classList.replace('bx-x', 'bx-search');
});

window.addEventListener('resize', () => {
    window.innerWidth < 768 ? sideBar.classList.add('close') : sideBar.classList.remove('close'); 
    window.innerWidth > 576 ? (searchBtnIcon.classList.replace('bx-x','bx-search'), searchForm.classList.remove('show')) : sideBar.classList.replace('bx-x'); 
})





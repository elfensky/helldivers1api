//scrollbehavior
const header = document.getElementById('header');
let lastScrollTop = 0;

function getColorValue(scrollTop) {
    const percentage = (scrollTop * 10).toString().padStart(3, '0');
    return `rgba(0, 0, 0, 0.${percentage})`;
}

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
        // Scrolling up
        if (header.classList.contains('header-transition')) {
            header.style.top = `0px`;

            if (scrollTop < 100) {
                header.style.backgroundColor = getColorValue(scrollTop);
            }
        } else {
            header.style.top = `-${scrollTop}px`;
        }
    } else {
        // Scrolling down
        if (scrollTop < 160) {
            header.classList.remove('header-transition');
            header.style.top = `-${scrollTop}px`;
            header.style.backgroundColor = `rgba(0, 0, 0, 0.00)`;
        } else {
            header.classList.add('header-transition');
            header.style.backgroundColor = `rgba(0, 0, 0, 1)`;
            header.style.top = `-160px`;
        }
    }

    lastScrollTop = Math.max(0, scrollTop); // For Mobile or negative scrolling
});

//scrollbehavior
const header = document.getElementById('header');
let direction = 'down';
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
        if (header.classList.contains('header-transition')) {
            header.style.top = `0px`;

            if (scrollTop < 100) {
                const percentage = (scrollTop * 10).toString();

                if (percentage.length === 2) {
                    const colorValue = '0' + percentage.toString();
                    header.style.backgroundColor = `rgba(0, 0, 0, 0.${colorValue})`;
                } else if (percentage.length === 1) {
                    const colorValue = '00' + percentage.toString();
                    header.style.backgroundColor = `rgba(0, 0, 0, 0.${colorValue})`;
                } else {
                    const colorValue = percentage.toString();
                    header.style.backgroundColor = `rgba(0, 0, 0, 0.${colorValue})`;
                }
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

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

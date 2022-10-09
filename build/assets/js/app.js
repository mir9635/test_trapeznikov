window.addEventListener('load', function () {
    let nav = document.querySelectorAll('.header-nav')[0],
        btn = document.querySelectorAll('.burger')[0];

    btn.addEventListener('click', function () {
        if(nav.classList.contains('active')) {
            nav.classList.remove('active');
        } else {
            nav.classList.add('active');
        }
    })
});

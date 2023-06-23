window.onload = init;

function init()
{
    resize();
}

function resize()
{
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let navBar = document.querySelector('.navbar');
    navBar.style.height = `${windowHeight * 0.075}px`;

    let navButtons = document.querySelectorAll('.navbar-buttons a');

    for (let i = 0; i < navButtons.length; i++)
    {
        navButtons[i].style.padding = `10px ${windowWidth * 0.02}px`
    }
}
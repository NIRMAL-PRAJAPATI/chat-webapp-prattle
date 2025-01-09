console.log("running boi")

$(document).ready(() => {

    // search button functionality
    let search_btn = document.querySelector('#search_btn');
    let searchbox = document.querySelector('.searchbox');
    let closesearch = document.querySelector('.closesearch');

    search_btn.addEventListener("click", () => {
        if (searchbox.style.left != "0px") {
            searchbox.style.left = "0px";
        }
    })

    closesearch.addEventListener("click", () => {
        if (searchbox.style.left == "0px") {
            searchbox.style.left = "-100%";
        }
    })

    // logout function
    document.querySelector('#logoutbtn').addEventListener("click", () => {
        fetch('/mainboard/logout', {
            method: 'GET',
            credentials: 'include',
        }).then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                alert('Logged out successfully');
            }
        }).catch(error => console.error('Error during logout:', error));
    })
})
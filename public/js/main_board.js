console.log("running boi")
// get cookie by name function
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
const loggedusername = getCookie("prattleuser");

$(document).ready(() => {

    $(".followerlist").on("click", (e) => {
        e.preventDefault();
        $("#right_side_box").html(`<p class="text-white m-5">Loading. . .</p>`);

        console.log(loggedusername);

        const followerusername = e.target.closest('.followerlist > div[data-username]').getAttribute('data-username');

        const chatboardID = [loggedusername, followerusername].sort().join('-chats-');

        $.ajax({
            url: `/chatboard/${followerusername}`,
            method: "POST",
            success: (data) => {
                $("#right_side_box").html(data);
            },
            error: (e) => {
                $("#right_side_box").html(`<p class="text-white m-5">Error, Somthing Gone Wrong. . .</p>`)
            }
        })
    })

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
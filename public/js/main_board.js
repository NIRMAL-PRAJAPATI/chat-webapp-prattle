console.log("running boi")
const socket = io();

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

    socket.emit("registerUser", loggedusername);

    $(".followerlist").on("click", (e) => {
        e.preventDefault();

        $("#right_side_box").empty().html(`<p class="text-white m-5">Loading. . .</p>`);

        const followerusername = e.target.closest('.followerlist > div[data-username]').getAttribute('data-username');

        $.ajax({
            url: `/chatboard/${loggedusername}/${followerusername}`,
            method: "GET",
            success: (data) => {
                $("#right_side_box").html(data);
            },
            error: (e) => {
                $("#right_side_box").html(`<p class="text-white m-5">Error, Somthing Gone Wrong. . .</p>`)
            }
        })
    })

    // follwer search button functionality
    let search_btn = document.querySelector('#search_btn');
    let searchbox = document.querySelector('#searchbox');
    let closesearch = document.querySelector('.closesearch');

    search_btn.addEventListener("click", () => {
        if (searchbox.style.left != "0px") {
            searchbox.style.left = "0px";
            searchbox.style.transition = "all 0.2s";
        }
        document.getElementById('followerSearchInput').focus();
    })

    closesearch.addEventListener("click", () => {
        if (searchbox.style.left == "0px") {
            searchbox.style.left = "-200%";
            searchbox.style.transition = "all 0.2s";
        }
        document.getElementById('followerSearchInput').value = "";
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

const checkfunc = async (username) => {
    await fetch("/mainboard/chatnow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username }) // Sending data as JSON
    })

    window.location.reload();
}

// global search user
let globalSearchCont = document.querySelector('#globalSearchedUsername');
let hideSearchContBtn = document.querySelector('#hideSearchCont');

hideSearchContBtn.addEventListener('click', () => {
    document.querySelector('#searchCont1').style.display = "none";
})

document.querySelector('#globalSearchBtn').addEventListener('click', async () => {

    let username = document.getElementById("searchInput").value.trim();

    if (username.length < 1) {
        console.log("increase input length")
        return;
    }

    try {
        let response = await fetch(`/mainboard/search?username=${username}`);
        let data = await response.json();

        globalSearchCont.innerHTML = "";
        document.querySelector('#searchCont1').style.display = "block";

        if (response.ok) {
            data.forEach((user) => {
                if (user.username != loggedusername) {
                    globalSearchCont.innerHTML += `<li class="flex items-center justify-between border-b border-gray-900 px-2 rounded-sm text-white">
                        <div>
                            <h2 class="text-md font-semibold tracking-wide">${user.username}</h2>
                            <p class="text-gray-400 text-[11px] -mt-1">Tie-in with <span class="font-bold text-md text-green-600">${user.followed_user.length - 1}</span> users</p>
                        </div>
                        <div>
                        <button class="py-2 px-3 rounded text-gray-400 hover:text-white" onclick="checkfunc('${user.username}');" title="Chat Now"><i class="fa-solid fa-comments"></i></button>
                        <i class="fa-solid fa-share-from-square text-gray-400 hover:text-white" title="Share"></i>
                        </div>
                    </li>`
                }
            })
        } else {
            console.log("user not available");
            globalSearchCont.innerHTML = `<p class="text-gray-200">No username available!</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})

// follower Search User
const followerSearch = () => {
    let followerSearchInput = document.querySelector('#followerSearchInput').value;
    let followerSearchCont = document.querySelectorAll('.followerlist');

    followerSearchCont.forEach((user) => {
        let username = user.querySelector('div').getAttribute('data-username');

            if(username && username.toLowerCase().includes(followerSearchInput)) {
                user.style.display = "block";
            } else {
                user.style.display = "none";
            }
    })
}

// filter Button Functionality
document.querySelector('#openFilterBtn').addEventListener('click', () => {
    document.querySelector('#filterCont').style.display = "flex";
})

document.querySelector('#closeFilterBtn').addEventListener('click', () => {
    document.querySelector('#filterCont').style.display = "none";
})
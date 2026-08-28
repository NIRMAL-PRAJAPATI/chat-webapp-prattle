console.log("running boi")
const socket = io();

// BUG FIX: Use server-provided username instead of reading from document.cookie
// httpOnly signed cookies are NOT accessible via document.cookie
const loggedusername = window.__PRATTLE_USER__;

// XSS-safe text escaping helper
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

  const isMobileView = () => window.innerWidth < 640;

  function openChat(user) {
    if (isMobileView()) {
      document.getElementById("left_side_box").style.display = "none";
      document.getElementById("right_side_box").style.display = "block";

      history.pushState({ chatOpen: true }, null, location.href);
    }
  }

  function showLeftSideBox() {
    document.getElementById("left_side_box").style.display = "block";
    document.getElementById("right_side_box").style.display = "none";
  }

  window.addEventListener("popstate", function (event) {
    if (isMobileView()) {
      showLeftSideBox();
      history.pushState(null, null, location.href);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (isMobileView()) {
      document.getElementById("right_side_box").style.display = "none";
      document.getElementById("left_side_box").style.display = "block";
    }

    const followers = document.querySelectorAll(".followerlist");
    followers.forEach(f => {
      f.addEventListener("click", function () {
        openChat(this.dataset.username);
      });
    });
  });

$(document).ready(() => {
    socket.emit("registerUser", loggedusername);

    // Realtime follower status updates (Online / Offline)
    socket.on("userStatus", ({ username, status }) => {
        if (!username) return;
        const cleanName = username.toLowerCase();
        document.querySelectorAll('.followerlist').forEach(item => {
            const userDiv = item.querySelector('div[data-username]');
            if (userDiv) {
                const followerName = userDiv.getAttribute('data-username');
                if (followerName && followerName.toLowerCase() === cleanName && followerName !== "Prattle AI") {
                    const statusText = item.querySelector('.follower-status-text');
                    const statusDot = item.querySelector('.follower-status-dot');
                    if (status === "online") {
                        if (statusText) statusText.innerHTML = `<span class="text-emerald-400 font-medium">Online</span>`;
                        if (statusDot) statusDot.className = "follower-status-dot absolute bottom-0 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900 transition-colors";
                    } else {
                        if (statusText) statusText.textContent = "Offline";
                        if (statusDot) statusDot.className = "follower-status-dot absolute bottom-0 right-3 w-2.5 h-2.5 bg-gray-500 rounded-full border-2 border-gray-900 transition-colors";
                    }
                }
            }
        });
    });

    socket.on("updateUserList", (onlineUsers) => {
        if (!Array.isArray(onlineUsers)) return;
        const onlineSet = new Set(onlineUsers.map(u => u.toLowerCase()));
        document.querySelectorAll('.followerlist').forEach(item => {
            const userDiv = item.querySelector('div[data-username]');
            if (userDiv) {
                const followerName = userDiv.getAttribute('data-username');
                if (followerName && followerName !== "Prattle AI") {
                    const isOnline = onlineSet.has(followerName.toLowerCase());
                    const statusText = item.querySelector('.follower-status-text');
                    const statusDot = item.querySelector('.follower-status-dot');
                    if (isOnline) {
                        if (statusText) statusText.innerHTML = `<span class="text-emerald-400 font-medium">Online</span>`;
                        if (statusDot) statusDot.className = "follower-status-dot absolute bottom-0 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900 transition-colors";
                    } else {
                        if (statusText) statusText.textContent = "Offline";
                        if (statusDot) statusDot.className = "follower-status-dot absolute bottom-0 right-3 w-2.5 h-2.5 bg-gray-500 rounded-full border-2 border-gray-900 transition-colors";
                    }
                }
            }
        });
    });

    $(".followerlist").on("click", (e) => {
        e.preventDefault();

        $("#right_side_box").empty().html(`
            <div class="h-full min-h-[100vh] flex flex-col items-center justify-center bg-gray-900 text-center px-6">
                <div class="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <span class="absolute inset-0 rounded-full border-2 border-emerald-500/25 animate-ping"></span>
                    <i class="fa-solid fa-comment-dots text-xl text-emerald-400"></i>
                </div>
                <p class="mt-5 text-sm font-medium tracking-wide text-gray-200">Opening conversation</p>
                <div class="mt-3 flex gap-1.5" aria-label="Loading">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:150ms]"></span>
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:300ms]"></span>
                </div>
            </div>`);

        // BUG FIX: Safely get the data-username attribute with null check
        const targetEl = e.target.closest('.followerlist > div[data-username]');
        if (!targetEl) return;
        const followerusername = targetEl.getAttribute('data-username');

        $.ajax({
            url: `/chatboard/${encodeURIComponent(loggedusername)}/${encodeURIComponent(followerusername)}`,
            method: "GET",
            success: (data) => {
                $("#right_side_box").html(data);
            },
            error: (e) => {
                $("#right_side_box").html(`<p class="text-white m-5">Error, Something Gone Wrong. . .</p>`)
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
        // BUG FIX: Reset the filter so all followers are visible again
        document.querySelectorAll('.followerlist').forEach(user => {
            user.style.display = "block";
        });
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
        return;
    }

    try {
        let response = await fetch(`/mainboard/search?username=${encodeURIComponent(username)}`);
        let data = await response.json();

        globalSearchCont.innerHTML = "";
        document.querySelector('#searchCont1').style.display = "block";

        if (response.ok) {
            data.forEach((user) => {
                if (user.username != loggedusername) {
                    // BUG FIX: Use escapeHtml to prevent XSS via usernames
                    const safeUsername = escapeHtml(user.username);
                    const followerCount = user.followed_user ? user.followed_user.length - 1 : 0;
                    globalSearchCont.innerHTML += `<li class="flex items-center justify-between border-b border-gray-900 px-2 rounded-sm text-white">
                        <div>
                            <h2 class="text-md font-semibold tracking-wide">${safeUsername}</h2>
                            <p class="text-gray-400 text-[11px] -mt-1">Tie-in with <span class="font-bold text-md text-green-600">${followerCount}</span> users</p>
                        </div>
                        <div>
                        <button class="py-2 px-3 rounded text-gray-400 hover:text-white" onclick="checkfunc('${safeUsername}');" title="Chat Now"><i class="fa-solid fa-comments"></i></button>
                        <i class="fa-solid fa-share-from-square text-gray-400 hover:text-white" title="Share"></i>
                        </div>
                    </li>`
                }
            })
        } else {
            globalSearchCont.innerHTML = `<p class="text-gray-200">No username available!</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
})

// follower Search User
const followerSearch = () => {
    let followerSearchInput = document.querySelector('#followerSearchInput').value.toLowerCase();
    let followerSearchCont = document.querySelectorAll('.followerlist');

    followerSearchCont.forEach((user) => {
        let usernameEl = user.querySelector('div[data-username]');
        // BUG FIX: Added null check — was crashing if element structure didn't match
        if (!usernameEl) return;
        let username = usernameEl.getAttribute('data-username');

            if(username && username.toLowerCase().includes(followerSearchInput)) {
                user.style.display = "block";
            } else {
                user.style.display = "none";
            }
    })
}

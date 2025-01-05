console.log("running boi")

$(document).ready(() => {
    $("#find_btn").on("click", (e) => {
        e.preventDefault();
        const page = e.target.dataset.page;
        $("#right_side_box").html(`<p class="text-white m-5">Loading. . .</p>`);

        console.log(page);
        $.ajax({
            url: page,
            method: "GET",
            success: (data) => {
                $("#right_side_box").html(data);
            },
            error: () => {
                $("#right_side_box").html(`<p class="text-white m-5">Error, Somthing Gone Wrong. . .</p>`)
            }
        })
    })

    let search_btn = document.querySelector('#search_btn');
    let searchbox = document.querySelector('.searchbox');
    let closesearch = document.querySelector('.closesearch');
    console.log("d")

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
        fetch('/logout', {
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
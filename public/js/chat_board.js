$(document).ready(() => {

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

    $(".followerlist").on("click", (e) => {
        e.preventDefault();
        $("#right_side_box").html(`<p class="text-white m-5">Loading. . .</p>`);

        console.log(loggedusername);

        const username = e.target.closest('.followerlist > div[data-username]').getAttribute('data-username');

            $.ajax({
                url: `/chatboard/${username}`,
                method: "POST",
                success: (data) => {
                    $("#right_side_box").html(data);
                },
                error: (e) => {
                    $("#right_side_box").html(`<p class="text-white m-5">Error, Somthing Gone Wrong. . .</p>`)
                }
        })
    })
})
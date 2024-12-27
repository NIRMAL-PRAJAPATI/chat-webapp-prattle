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
})
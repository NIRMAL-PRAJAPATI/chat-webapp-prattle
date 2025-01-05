let form = document.querySelector('#formsubmit');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let conpassword = document.querySelector('#conpassword');
let formbtn = document.querySelector('#formbtn');
let errormsg = document.querySelector('#errormsg');

const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// form validation
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(username.value.length <= 3 || username.value.length > 15) {
        errormsg.textContent = "Username must be between 4 to 15 characters!";
        return;
    } else if(/\s/.test(username.value)) {
        errormsg.textContent = "Username must not contain spaces!";
        return;
    }

    if(!password.value.match(passwordpattern)) {
        errormsg.textContent = "Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character!";
        return;
    }

    if(password.value !== conpassword.value) {
        errormsg.textContent = "Password and Confirm Password Does not match!";
        return;
    }
    form.submit();
})

// login user confirmationbox coding
document.querySelector('#cancelconfirmationbtn').addEventListener("click", () => {
    document.querySelector('#confirmationbox').style.display = "none";
})
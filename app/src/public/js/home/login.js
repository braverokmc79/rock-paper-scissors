"use strict"
const user_id = document.querySelector("#user_id");
const psword = document.querySelector("#psword");
const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        user_id: user_id.value,
        psword: psword.value
    }

    fetch("/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                location.href = "/";
            } else {
                console.log(res);
                alert(res.msg);
            }
        }).catch(err => {
            console.log(new Error("로그인 중 에러 발생"));
        });

}

"use strict"

const toDate = new Date();
const year = toDate.getFullYear() - 15;
const month = toDate.getMonth() + 1;
const day = toDate.getDate();

const autoHyphen = (target) => {
    target.value = target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}


document.getElementById('birthday').value = `${year}-${month}-${day}`;

const user_id = document.querySelector("#user_id");

const age = document.querySelector("#age");
const gender = document.querySelector("#gender");
const birthday = document.querySelector("#birthday");
const phone = document.querySelector("#phone_number");


const name = document.querySelector("#name");
const psword = document.querySelector("#psword");
const passwordCheck = document.querySelector("#password_check");
const registerBtn = document.querySelector("button");



registerBtn.addEventListener("click", register);

function register() {

    if (!user_id.value) return alert("아이디를 입력하세요");
    if (!name.value) return alert("이름을 입력하세요");

    if (!age.value) return alert("나이를 입력하세요");
    if (!gender.value) return alert("성별을 입력하세요");

    if (!psword.value) return alert("비밀번호를 입력하세요");
    if (psword.value !== passwordCheck.value) return alert("비밀번호가 일치하지 않습니다.");

    if (!birthday.value) return alert("생년월일을 입력하세요");
    if (!phone.value) return alert("전화번호를 입력하세요");

    const req = {
        user_id: user_id.value,
        name: name.value,
        age: age.value,
        gender: gender.value,
        psword: psword.value,
        passwordCheck: passwordCheck.value,
        birthday: birthday.value,
        phone: phone.value
    }

    fetch("/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                location.href = "/users/login";
            } else {
                alert(res.msg);
            }

        }).catch(err => console.log(new Error("회원가입 중 에러 발생")));

}

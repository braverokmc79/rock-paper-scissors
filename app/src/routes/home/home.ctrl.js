"use strict"

const User = require("../../models/User");
const logger = require("../../config/logger");

const output = {
    home: (req, res) => {
        logger(null, req, res);
        console.log(" 로그인 정보 : ", req.session.user);
        res.render("home/index", { user: req.session.user, title_text: 'express!', title_welcome: '웰컴!' });
    },

    //로그인 
    login: (req, res) => {
        logger(null, req, res);

        res.render("home/login");
    },

    //회원 가입
    register: (req, res) => {
        logger(null, req, res);
        res.render("home/register");
    },

    //로그아웃
    logout: (req, res) => {
        req.session.destroy(function (err) {
            if (err) throw err;
            console.log('세션 삭제하고 로그아웃됨');
            res.render("home/index");
        });
    },

    //게임 화면
    game: (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }
        res.render("home/game", { user: req.session.user });
    },

    //게임 - 바위
    gameRock: async (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }

        const resData = await process._gameProcessing(req, res, "rock");
        res.render("home/game-result", resData);
    },


    //게임 - 보
    gamePaper: async (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }

        const resData = await process._gameProcessing(req, res, "paper");
        res.render("home/game-result", resData);
    },



    //게임 - 가위
    gameScissors: async (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }

        const resData = await process._gameProcessing(req, res, "scissors");
        res.render("home/game-result", resData);
    },




    //랭킹
    gameRanking: async (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }

        const user = new User(req.body);
        const result = await user.gameRanking();
        console.log("랭킹  : ", result);

        const data = { result: result }
        res.render("home/game-ranking", data);
    },


    //게임 history
    gameHistory: async (req, res) => {
        logger(null, req, res);
        console.log("게임 history  ");
        if (req.session.user == undefined) {
            res.render("home/login");
            return;
        }

        const user_id = req.session.user.body.user_id;
        const user = new User(req.body);
        const myVictory = await user.myVictory(user_id);
        const response = await user.gameHistory(user_id);

        const data = {
            user_id: req.session.user.body.user_id,
            result: response,
            myVictory
        }

        console.log(" 게임 history :", data);

        res.render("home/game-history", data);
    },

}


const process = {

    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        //로그인 세션 저장
        req.session.user = user;
        logger(response, req, res);
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        logger(response, req, res);
    },




    _gameProcessing: async (req, res, param) => {
        const score = {
            rock: 0,
            scissors: 1,
            paper: 2
        };

        const scoreValue = {
            0: "rock",
            1: "scissors",
            2: "paper"
        };

        let win = 0;
        let lose = 0;
        let draw = 0;

        const myValue = score[param]; //내가 선택한 score객체 값
        const comValue = Math.floor(Math.random() * 3); //컴퓨터가 선택한 score객체 값      

        const cal = myValue - comValue;
        const calResult = [-1, 2].includes(cal)

        console.log("점수  : ", myValue, comValue);
        console.log("가위바위보 : ", scoreValue[parseInt(myValue)], scoreValue[parseInt(comValue)]);
        const my_hand = param;
        const enemy_hand = scoreValue[parseInt(comValue)];

        let result = "";
        if (myValue - comValue === 0) {
            draw = 1;
            result = "draw";
            console.log("비겼습니다.");
        } else if (calResult) {
            win = 1;
            result = "win";
            console.log("이겼습니다.");
        } else {
            lose = 1;
            result = "lose";
            console.log("졌습니다.");
        }

        const data = {
            my_hand,
            enemy_hand,
            result,
            win,
            lose,
            draw,
            user_id: req.session.user.body.user_id
        }

        console.log("업데이트 할 데이터 : ", data);

        const user = new User(req.body);
        const response = await user.gameSave(data);


        console.log("DB response : ", response);

        const resData = {
            result: result,
            my_hand: my_hand,
            enemy_hand: enemy_hand
        }

        console.log("반환 할 데이터 : ", resData);

        return resData;

    },


}

module.exports = {
    output,
    process
}



"use strict"
const UserStorage = require("./UserStorage");
class User {

    constructor(body) {
        this.body = body;
    }

    async login() {
        try {
            const client = this.body;
            console.log(" login  :", client);
            const { user_id, psword } = await UserStorage.getUserInfo(client.user_id);

            if (user_id) {
                if (user_id === client.user_id && psword === client.psword) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디 입니다." };

        } catch (err) {


            return { success: false, err }
        }

    }

    async register() {
        try {
            const client = this.body;
            return await UserStorage.save(client);
        } catch (err) {
            return { success: false, err }
        }

    }

    //게임 저장
    async gameSave(data) {
        try {
            return await UserStorage.gameSave(data);
        } catch (err) {
            return { success: false, err }
        }
    }

    //게임 랭킹
    async gameRanking() {
        try {
            return await UserStorage.gameRanking();
        } catch (err) {
            return { success: false, err }
        }
    }



    //게임 결과
    async gameHistory(user_id) {
        try {
            return await UserStorage.gameHistory(user_id);
        } catch (err) {
            return { success: false, err }
        }
    }

    //나의 승리
    async myVictory(user_id) {
        try {
            return await UserStorage.myVictory(user_id);
        } catch (err) {
            return { success: false, err }
        }
    }


}

module.exports = User;
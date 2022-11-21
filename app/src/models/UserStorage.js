"use strict"
//const fs = require("fs").promises;
const db = require("../config/db");
class UserStorage {

    static async getUserInfo(user_id) {

        return new Promise((resolove, rejects) => {
            const query = "SELECT * FROM user_info WHERE user_id= ? ";
            db.query(query, [user_id], function (err, data) {
                if (err) return rejects(err);
                resolove(data.length === 0 ? false : data[0]);
            })
        });

    }


    static async save({ user_id, name, gender, birthday, psword, age, phone }) {
        console.log("회원 가입 ", { user_id, name, gender, birthday, psword, age, phone });

        return new Promise((resolove, rejects) => {
            const query = `INSERT INTO user_info(user_id, name, gender, birthday, psword, age, phone) 
                                VALUES(?, ?, ?, ?, ?, ?, ? ) `;
            db.query(query, [user_id, name, gender, birthday, psword, age, phone], function (err) {
                if (err) return rejects(`${err}`);
                resolove({ success: true });
            })
        });
    }


    static async gameSave({ my_hand, enemy_hand, result, win, lose, draw, user_id }) {


        return new Promise((resolove, rejects) => {

            let query = ` INSERT INTO game(user_id, my_hand, enemy_hand, result ) VALUES(?, ?,?, ? ) `;
            db.query(query, [user_id, my_hand, enemy_hand, result], function (err) {

                if (err) return rejects(`${err}`);

                query = ` UPDATE user_info SET  win = win+?, lose = lose+?, draw = draw+?, game_count = game_count+1 WHERE user_id = ? `;
                db.query(query, [win, lose, draw, user_id], function (err) {
                    if (err) return rejects(`${err}`);
                    resolove({ success: true });
                })

            });

        });
    }

    // 게임 랭킹    
    static async gameRanking() {

        return new Promise((resolove, rejects) => {
            const query = ` 	Select * 
	FROM (
		  select  rank() over (order by win desc) as 'ranking'  , user_id, win , lose ,  draw,  game_count
		from user_info 
	    ) ranked
	where ranked.ranking  < 1000000000000 `;
            db.query(query, [], function (err, data) {
                if (err) return rejects(`${err}`);
                resolove(data.length === 0 ? false : data);
            })
        });
    }


    static async gameHistory(user_id) {
        return new Promise((resolove, rejects) => {
            const query = ` SELECT * FROM game WHERE user_id = ? `;
            db.query(query, [user_id], function (err, data) {
                if (err) return rejects(`${err}`);
                resolove(data.length === 0 ? false : data);
            })
        });
    }


    static async myVictory(user_id) {
        return new Promise((resolove, rejects) => {
            const query = ` SELECT * FROM user_info WHERE user_id = ? `;
            db.query(query, [user_id], function (err, data) {
                if (err) return rejects(`${err}`);
                resolove(data.length === 0 ? false : data[0]);
            })
        });
    }



}


module.exports = UserStorage;
create user `nodejsejs`@`localhost` identified by '1234';
  
create database nodejsejs CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  
grant all privileges on nodejsejs.* to `nodejsejs`@`localhost` ;


drop table users;
-- create table users(
-- 	user_id varchar(30) not null,
--     name varchar(30) not null,    
--     win int default 0 ,
--     lose int  default 0 ,
--     draw int  default 0 ,
--     game_count int default 0 ,
--     psword varchar(30) not null,
--     in_date datetime default current_timestamp,
--     primary key (user_id)
-- );



CREATE TABLE `user_info` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `psword` varchar(100) COLLATE utf8mb3_bin DEFAULT NULL,
  `age` int DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb3_bin DEFAULT NULL,
   win int default 0 ,
   lose int  default 0 ,
   draw int  default 0 ,
   game_count int default 0 ,   
   in_date datetime default current_timestamp,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `id_UNIQUE` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


create table game(
	id int auto_increment not null,
    user_id varchar(30) not null,
    my_hand varchar(10) not null,
    enemy_hand varchar(10) not null,
    result varchar(10) not null,
    in_date datetime default current_timestamp,
    primary key (id)
);


show tables;
desc users;

select * from users;

insert into user_info(user_id, name, psword) 
	values
     ("jk" , "jk", "1111"),
     ("sgh" , "sgh", "1111"),
     ("20191411" , "20191411", "1111"),
     ("111" , "111", "1111"),
     ("kim" , "kim", "1111"),
     ("stZeroart" , "stZeroart", "1111"),
     ("kk" , "kk", "1111"),
     ("20163023" , "20163023", "1111"),
     ("kkk" , "kkk", "1111");




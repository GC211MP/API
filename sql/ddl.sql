

drop database mp211;
create database mp211 character set utf8mb4;
use mp211;

create table user (
    idx int AUTO_INCREMENT, 
    user_id VARCHAR(32) NOT NULL ,
    user_name varchar(32) NOT NULL,
    c_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    user_password varchar(128) NOT NULL ,

    PRIMARY KEY (idx)
);

create table data (
    idx int AUTO_INCREMENT ,
    user_idx int not null,
    stage_id int not null,
    elapsed_time int not null,
    -- ??

    PRIMARY KEY (idx),
    FOREIGN KEY (user_idx) REFERENCES user(idx)
);


SHOW TABLES;
DESC user;
DESC data;



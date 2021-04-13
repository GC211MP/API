

drop database GCMP;
create database GCMP;
use GCMP;
create table USER (
    idx int AUTO_INCREMENT, 
    user_id VARCHAR(32) NOT NULL ,
    user_name varchar(32) NOT NULL,
    c_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    user_password varchar(128) NOT NULL ,
    PRIMARY KEY (idx)
);

create table DATA (
    idx int AUTO_INCREMENT ,
    user_idx int not null,
    stage_id int not null,
    elapsed_time int not null,
    -- ??

    PRIMARY KEY (idx),
    FOREIGN KEY (user_idx) REFERENCES USER(idx)
);


SHOW TABLES;
DESC USER;
DESC DATA;



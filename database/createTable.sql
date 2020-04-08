CREATE TABLE IF NOT EXISTS `user_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(30) NOT NULL,
   `password` VARCHAR(50) NOT NULL,
   `description` VARCHAR(100),
   `avatar_url` VARCHAR(100),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `post_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `author_id` INT UNSIGNED,
   `title` VARCHAR(50) NOT NULL,
   `description` VARCHAR(150),
   `content` TEXT,
   `praise_num` SMALLINT,
   `dislike_num` SMALLINT,
   `create_time` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comment_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `author_id` INT UNSIGNED,
   `to_post` INT UNSIGNED,
   `to_comment` INT UNSIGNED DEFAULT(0),
   `content` VARCHAR(200) NOT NULL,
   `praise_num` SMALLINT,
   `dislike_num` SMALLINT,
   `create_time` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
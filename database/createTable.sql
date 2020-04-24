CREATE TABLE IF NOT EXISTS `user_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(30) NOT NULL,
   `password` VARCHAR(50) NOT NULL,
   `description` VARCHAR(100),
   `avatar_url` VARCHAR(200),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `post_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `author_id` INT UNSIGNED NOT NULL,
   `title` VARCHAR(50) NOT NULL,
   `description` VARCHAR(150), 
   `category` VARCHAR(50),
   `praise_num` SMALLINT DEFAULT(0),
   `dislike_num` SMALLINT DEFAULT(0),
   `create_time` TIMESTAMP NULL DEFAULT NOW(),
   `content_url` VARCHAR(200) NOT NULL, -- blog should store in file system
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comment_table`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `author_id` INT UNSIGNED NOT NULL,
   `to_post` INT UNSIGNED NOT NULL,
   `to_comment` INT UNSIGNED DEFAULT(0),
   `content` VARCHAR(200) NOT NULL,
   `praise_num` SMALLINT DEFAULT(0),
   `dislike_num` SMALLINT DEFAULT(0),
   `create_time` TIMESTAMP NULL DEFAULT NOW(),
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
USE pong;

CREATE TABLE highscore (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`username` VARCHAR(12) NOT NULL,
`score` INT NOT NULL
)ENGINE=InnoDB;

INSERT INTO highscore (username,score) VALUES ('Phenix',1000);

-- CREATE TABLE highscore;

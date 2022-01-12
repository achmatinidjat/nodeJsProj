CREATE TABLE `users` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`Login` varchar(64) NOT NULL UNIQUE,
	`password` varchar(64) NOT NULL,
	`email` varchar(64) NOT NULL UNIQUE,
	`role` varchar(10) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `teachers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`discipline_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `courses` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`title` varchar(32) NOT NULL,
	`topic` varchar(64) NOT NULL,
	`teacher_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`discipline_id` INT NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `disciplines` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`teacher_id` INT NOT NULL,
	`title` varchar(32) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `grades` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`discipline_id` INT NOT NULL,
	`grade` INT NOT NULL,
	`teacher_id` INT NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `course_id` (
	`course_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`ID` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `user_info` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`name` varchar(64) NOT NULL,
	`last_name` varchar(64) NOT NULL,
	`rating` INT NOT NULL,
	`date_of_birth` DATE NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE `table` (
	`ID` INT NOT NULL AUTO_INCREMENT,
	`discipline_id` INT NOT NULL,
	`teacher_id` INT NOT NULL,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `teachers` ADD CONSTRAINT `teachers_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`);

ALTER TABLE `teachers` ADD CONSTRAINT `teachers_fk1` FOREIGN KEY (`discipline_id`) REFERENCES `disciplines`(`ID`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`);

ALTER TABLE `courses` ADD CONSTRAINT `courses_fk2` FOREIGN KEY (`discipline_id`) REFERENCES `disciplines`(`ID`);

ALTER TABLE `disciplines` ADD CONSTRAINT `disciplines_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk1` FOREIGN KEY (`discipline_id`) REFERENCES `disciplines`(`ID`);

ALTER TABLE `grades` ADD CONSTRAINT `grades_fk2` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);

ALTER TABLE `course_id` ADD CONSTRAINT `course_id_fk0` FOREIGN KEY (`course_id`) REFERENCES `courses`(`ID`);

ALTER TABLE `course_id` ADD CONSTRAINT `course_id_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`);

ALTER TABLE `user_info` ADD CONSTRAINT `user_info_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`);

ALTER TABLE `table` ADD CONSTRAINT `table_fk0` FOREIGN KEY (`discipline_id`) REFERENCES `disciplines`(`ID`);

ALTER TABLE `table` ADD CONSTRAINT `table_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`);










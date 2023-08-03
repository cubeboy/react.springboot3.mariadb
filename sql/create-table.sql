-- cardb.owner definition

CREATE TABLE `owner` (
  `owner_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- cardb.user_info definition

CREATE TABLE `user_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- cardb.car definition

CREATE TABLE `car` (
  `price` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `owner` bigint(20) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `register_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiifvsxc4am8k9n1526ciexyp6` (`owner`),
  CONSTRAINT `FKiifvsxc4am8k9n1526ciexyp6` FOREIGN KEY (`owner`) REFERENCES `owner` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

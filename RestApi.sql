CREATE TABLE IF NOT EXISTS `token` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `token` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `isVerified` int(5) NOT NULL DEFAULT '0',
  `isActive` int(5) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `verificationToken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 



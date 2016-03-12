-- MySQL dump 10.15  Distrib 10.0.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ang2blog
-- ------------------------------------------------------
-- Server version	10.0.23-MariaDB-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ang2blog`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ang2blog` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ang2blog`;

--
-- Table structure for table `BlogPosts`
--

DROP TABLE IF EXISTS `BlogPosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BlogPosts` (
  `owner` varchar(128) NOT NULL DEFAULT '',
  `dateTime` varchar(128) NOT NULL DEFAULT '',
  `data` text,
  PRIMARY KEY (`owner`,`dateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogPosts`
--

LOCK TABLES `BlogPosts` WRITE;
/*!40000 ALTER TABLE `BlogPosts` DISABLE KEYS */;
INSERT INTO `BlogPosts` VALUES ('admin','Fri Mar 11 2016 20:53:16 GMT-0800 (PST)','{\"comments\":[],\"header\":\"test\",\"body\":\"test\",\"owner\":\"admin\",\"date\":\"Fri Mar 11 2016 20:53:16 GMT-0800 (PST)\"}'),('admin','Fri Mar 11 2016 20:53:18 GMT-0800 (PST)','{\"comments\":[],\"header\":\"yrdsy\",\"body\":\"yseye\",\"owner\":\"admin\",\"date\":\"Fri Mar 11 2016 20:53:18 GMT-0800 (PST)\"}');
/*!40000 ALTER TABLE `BlogPosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user` varchar(32) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  `token` int(11) DEFAULT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('adam','adam',1),('admin','admin',1),('as','safd',2),('jay','jay',1),('keegan','keegan',2),('test','test',2),('test1','test1',2),('tyler','tyler',2),('user','user',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-11 21:15:48

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 04:07 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--
CREATE DATABASE IF NOT EXISTS `school` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `school`;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `MSSV` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fullName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `fee` double NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`MSSV`, `fullName`, `fee`, `createdAt`, `updatedAt`) VALUES
('51900002', 'Trần Thu Hà', 10000000, '2022-10-16 08:27:42', '2022-10-26 08:49:41'),
('51900064', 'Nguyễn Văn Đức', 0, '2022-10-16 08:27:42', '2022-10-23 07:23:55'),
('51900069', 'Lu Huỳnh Ngân', 2000000, '2022-10-16 08:27:42', '2022-10-23 07:23:55'),
('51900123', 'Trần Thị Kiều\r\n', 15000000, '2022-10-16 08:27:42', '2022-10-23 07:23:55'),
('51900321', 'Phan Duy Tâm\r\n', 2000000, '2022-10-16 08:27:42', '2022-10-23 07:23:55'),
('51900342', 'Nguyễn Xuân Việt', 0, '2022-10-16 08:27:42', '2022-10-26 08:49:41'),
('51900432', 'Nguyễn Văn Tuấn', 0, '2022-10-16 08:26:05', '2022-10-23 07:22:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`MSSV`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

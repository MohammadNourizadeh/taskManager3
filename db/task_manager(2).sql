-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2025 at 07:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `city_weather`
--

CREATE TABLE `city_weather` (
  `id` int(9) NOT NULL,
  `city` varchar(100) NOT NULL,
  `user_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `city_weather`
--

INSERT INTO `city_weather` (`id`, `city`, `user_id`) VALUES
(5, 'Tehran', 20),
(24, 'Cairo', 20),
(41, 'Beijing', 7),
(45, 'Chicago', 7),
(46, 'Rome', 7);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(8) NOT NULL,
  `name` varchar(70) NOT NULL,
  `date` date NOT NULL,
  `isImportant` tinyint(1) NOT NULL,
  `isDone` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(8) NOT NULL COMMENT 'ایدی یوزر هایی که تسک به انها مربوط میباشد'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `date`, `isImportant`, `isDone`, `user_id`) VALUES
(92, 'a', '0000-00-00', 0, 1, 0),
(93, '', '0000-00-00', 0, 1, 0),
(94, '', '0000-00-00', 1, 0, 0),
(95, '2', '0000-00-00', 1, 1, 0),
(96, 'awds', '0000-00-00', 0, 0, 0),
(97, '', '0000-00-00', 0, 0, 0),
(98, '', '0000-00-00', 0, 0, 0),
(99, 'ش', '0000-00-00', 1, 0, 0),
(100, '', '0000-00-00', 0, 0, 0),
(102, 'daws', '2025-08-20', 0, 0, 0),
(104, '', '0000-00-00', 0, 0, 0),
(105, '', '0000-00-00', 1, 0, 0),
(106, 'lllllllllllllllllllllllllllllllllllllllllllllll', '0000-00-00', 1, 0, 0),
(107, '', '0000-00-00', 0, 0, 0),
(108, 'ssssssssssssssssss', '0000-00-00', 0, 1, 0),
(109, '', '0000-00-00', 0, 0, 0),
(110, '', '0000-00-00', 0, 0, 0),
(111, 'wd', '0000-00-00', 0, 0, 0),
(112, '', '0000-00-00', 0, 0, 0),
(113, '', '2025-08-13', 0, 0, 0),
(114, 'wads', '0000-00-00', 0, 0, 0),
(115, '', '0000-00-00', 0, 0, 0),
(124, 'ddd', '0000-00-00', 0, 0, 0),
(125, '', '0000-00-00', 0, 0, 0),
(126, '', '0000-00-00', 0, 0, 0),
(127, '', '0000-00-00', 0, 0, 0),
(128, '', '0000-00-00', 0, 0, 0),
(129, '', '0000-00-00', 0, 0, 0),
(133, '', '0000-00-00', 0, 0, 0),
(164, 'material UI', '2025-10-29', 0, 0, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(7, 'a@email.com', 'a', 'w'),
(20, 'mo.nourizadeh1@gmail.com', 'mohmmd_zn', 'Nono8282');

-- --------------------------------------------------------

--
-- Table structure for table `user_setting`
--

CREATE TABLE `user_setting` (
  `theme` varchar(6) NOT NULL DEFAULT 'dark',
  `user_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `user_setting`
--

INSERT INTO `user_setting` (`theme`, `user_id`) VALUES
('dark', 7),
('dark', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city_weather`
--
ALTER TABLE `city_weather`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city_weather`
--
ALTER TABLE `city_weather`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

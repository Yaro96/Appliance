-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2017 at 03:56 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appliance`
--

-- --------------------------------------------------------

--
-- Table structure for table `capacities`
--

CREATE TABLE `capacities` (
  `id` int(11) NOT NULL,
  `weightKgs` int(11) NOT NULL,
  `weightLbs` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `capacities`
--

INSERT INTO `capacities` (`id`, `weightKgs`, `weightLbs`) VALUES
(1, 5, 11),
(2, 7, 15),
(3, 8, 18),
(4, 10, 22);

-- --------------------------------------------------------

--
-- Table structure for table `centrifuges`
--

CREATE TABLE `centrifuges` (
  `id` int(11) NOT NULL,
  `rpm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `centrifuges`
--

INSERT INTO `centrifuges` (`id`, `rpm`) VALUES
(1, 400),
(2, 800),
(3, 1000),
(4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`id`, `name`, `capacity`) VALUES
(1, 'E44JTSB7', 1),
(2, '7VFJS47S', 3);

-- --------------------------------------------------------

--
-- Table structure for table `models_programs`
--

CREATE TABLE `models_programs` (
  `idModel` int(11) NOT NULL,
  `idProgram` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `models_programs`
--

INSERT INTO `models_programs` (`idModel`, `idProgram`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 7),
(1, 8),
(1, 9),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 7),
(2, 8),
(2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `powerstates`
--

CREATE TABLE `powerstates` (
  `id` tinyint(1) NOT NULL,
  `name` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `powerstates`
--

INSERT INTO `powerstates` (`id`, `name`) VALUES
(0, 'OFF'),
(1, 'ON');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `temperature` int(11) DEFAULT NULL,
  `time` time NOT NULL,
  `defaultCentrifuge` int(11) NOT NULL,
  `prewash` tinyint(1) NOT NULL,
  `wash` tinyint(1) NOT NULL,
  `rinse` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `name`, `temperature`, `time`, `defaultCentrifuge`, `prewash`, `wash`, `rinse`) VALUES
(1, 'Centrifuge', NULL, '00:30:00', 3, 0, 0, 0),
(2, 'Wool', 30, '00:45:00', 1, 0, 1, 1),
(3, 'Cold', NULL, '01:00:00', 3, 0, 1, 1),
(4, 'Synthetic', 30, '01:20:00', 3, 0, 1, 1),
(5, 'Fast 29\'', 30, '00:29:00', 3, 0, 1, 1),
(6, 'Prewash', 60, '00:20:00', 3, 1, 0, 0),
(7, 'Cotton 90°', 90, '00:50:00', 3, 0, 1, 1),
(8, 'Cotton 60°', 60, '01:10:00', 3, 0, 1, 1),
(9, 'Cotton 40°', 40, '01:30:00', 3, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `name`) VALUES
(1, 'paused'),
(2, 'running'),
(3, 'waiting');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `model` int(11) NOT NULL,
  `powerState` tinyint(1) NOT NULL DEFAULT '0',
  `state` int(11) NOT NULL DEFAULT '3',
  `currentProgram` int(11) NOT NULL DEFAULT '9',
  `timer` time NOT NULL DEFAULT '00:00:00',
  `centrifuge` int(11) NOT NULL DEFAULT '4',
  `intensive` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `model`, `powerState`, `state`, `currentProgram`, `timer`, `centrifuge`, `intensive`) VALUES
(2, 2, 0, 3, 5, '00:00:00', 4, 0),
(3, 1, 0, 3, 9, '00:00:00', 4, 0),
(4, 2, 1, 2, 4, '00:00:00', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `capacities`
--
ALTER TABLE `capacities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `centrifuges`
--
ALTER TABLE `centrifuges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `capacity` (`capacity`);

--
-- Indexes for table `models_programs`
--
ALTER TABLE `models_programs`
  ADD UNIQUE KEY `index_name` (`idModel`,`idProgram`),
  ADD KEY `idProgram` (`idProgram`);

--
-- Indexes for table `powerstates`
--
ALTER TABLE `powerstates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `defaultCentrifuge` (`defaultCentrifuge`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model` (`model`),
  ADD KEY `powerState` (`powerState`),
  ADD KEY `state` (`state`),
  ADD KEY `currentProgram` (`currentProgram`,`model`),
  ADD KEY `centrifuge` (`centrifuge`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `capacities`
--
ALTER TABLE `capacities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `centrifuges`
--
ALTER TABLE `centrifuges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `models_programs`
--
ALTER TABLE `models_programs`
  ADD CONSTRAINT `models_programs_ibfk_1` FOREIGN KEY (`idModel`) REFERENCES `models` (`id`),
  ADD CONSTRAINT `models_programs_ibfk_2` FOREIGN KEY (`idProgram`) REFERENCES `programs` (`id`);

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`defaultCentrifuge`) REFERENCES `centrifuges` (`id`);

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_ibfk_1` FOREIGN KEY (`model`) REFERENCES `models` (`id`),
  ADD CONSTRAINT `units_ibfk_3` FOREIGN KEY (`powerState`) REFERENCES `powerstates` (`id`),
  ADD CONSTRAINT `units_ibfk_4` FOREIGN KEY (`state`) REFERENCES `states` (`id`),
  ADD CONSTRAINT `units_ibfk_5` FOREIGN KEY (`currentProgram`) REFERENCES `programs` (`id`),
  ADD CONSTRAINT `units_ibfk_6` FOREIGN KEY (`currentProgram`,`model`) REFERENCES `models_programs` (`idProgram`, `idModel`),
  ADD CONSTRAINT `units_ibfk_7` FOREIGN KEY (`centrifuge`) REFERENCES `centrifuges` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

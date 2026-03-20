-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost
-- 生成日時: 2025 年 4 月 12 日 03:52
-- サーバのバージョン： 10.4.27-MariaDB
-- PHP のバージョン: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `assignment1`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(10) UNSIGNED DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `recipient_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `orders`
--

INSERT INTO `orders` (`order_id`, `product_id`, `quantity`, `recipient_name`, `email`, `phone`, `address`, `timestamp`) VALUES
(1, 1001, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, NSW', '2025-04-11 21:37:39'),
(2, 1002, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, NSW', '2025-04-11 21:37:39'),
(3, 1002, 1, 'ss', 'ex.high_24s@outlook.com', '0431700588', '13 Potter street, Waterloo, QLD', '2025-04-11 21:40:12'),
(4, 1001, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, ACT', '2025-04-12 11:17:41'),
(5, 1002, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, ACT', '2025-04-12 11:17:41'),
(6, 1001, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, NT', '2025-04-12 11:19:32'),
(7, 1003, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, NT', '2025-04-12 11:19:32'),
(8, 1004, 1, 'ss', 'admin@admin.com', '1234567890', '13 Potter street, Waterloo, NT', '2025-04-12 11:19:32'),
(9, 1001, 1, 'sh0w', 'ex.high_24s@outlook.com', '0431700588', '13 Potter street, Waterloo, NSW', '2025-04-12 11:38:23'),
(10, 1002, 1, 'sh0w', 'ex.high_24s@outlook.com', '0431700588', '13 Potter street, Waterloo, NSW', '2025-04-12 11:38:23'),
(11, 1003, 1, 'sh0w', 'ex.high_24s@outlook.com', '0431700588', '13 Potter street, Waterloo, NSW', '2025-04-12 11:38:23');

-- --------------------------------------------------------

--
-- テーブルの構造 `products`
--

CREATE TABLE `products` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(20) DEFAULT NULL,
  `unit_price` float(8,2) DEFAULT NULL,
  `unit_quantity` varchar(15) DEFAULT NULL,
  `in_stock` int(10) UNSIGNED DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `subcategory` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `unit_price`, `unit_quantity`, `in_stock`, `category`, `subcategory`, `image_url`) VALUES
(1000, 'Fish Fingers', 2.55, '500 gram', 0, 'Seafood', 'Fish', 'images/fish_fingers.png'),
(1001, 'Fish Fingers', 5.00, '1000 gram', 735, 'Seafood', 'Fish', 'images/fish_fingers.png'),
(1002, 'Hamburger Patties', 2.35, 'Pack 10', 1189, 'Meat', 'Patties', 'images/patties.jpg'),
(1003, 'Shelled Prawns', 6.90, '250 gram', 297, 'Seafood', 'Prawns', 'images/Shelled Prawns.jpeg'),
(1004, 'Tub Ice Cream', 1.80, 'I Litre', 797, 'Desserts', 'Ice Cream', 'images/tub_ice_cream.jpg'),
(1005, 'Tub Ice Cream', 3.40, '2 Litre', 1198, 'Desserts', 'Ice Cream', 'images/tub_ice_cream.jpg'),
(2000, 'Panadol', 3.00, 'Pack 24', 2000, 'Household', 'Medicine', 'images/panadol.jpg'),
(2001, 'Panadol', 5.50, 'Bottle 50', 1000, 'Household', 'Medicine', 'images/panadol.jpg'),
(2002, 'Bath Soap', 2.60, 'Pack 6', 500, 'Household', 'Soap', 'images/bath_soap.jpeg'),
(2003, 'Garbage Bags Small', 1.50, 'Pack 10', 500, 'Household', 'Garbage Bags', 'images/garbage_bag.jpg'),
(2004, 'Garbage Bags Large', 5.00, 'Pack 50', 300, 'Household', 'Garbage Bags', 'images/garbage_bag.jpg'),
(2005, 'Washing Powder', 4.00, '1000 gram', 800, 'Household', 'Cleaning', 'images/washing powder.jpg'),
(2006, 'Laundry Bleach', 3.55, '2 Litre Bottle', 500, 'Household', 'Cleaning', 'images/Laundry Bleach.jpg'),
(3000, 'Cheddar Cheese', 8.00, '500 gram', 1000, 'Dairy', 'Cheese', 'images/cheddar cheese.jpg'),
(3001, 'Cheddar Cheese', 15.00, '1000 gram', 999, 'Dairy', 'Cheese', 'images/cheddar cheese.jpg'),
(3002, 'T Bone Steak', 7.00, '1000 gram', 199, 'Meat', 'Steak', 'images/steak.jpeg'),
(3003, 'Navel Oranges', 3.99, 'Bag 20', 199, 'Fruits', 'Oranges', 'images/orange.jpg'),
(3004, 'Bananas', 1.49, 'Kilo', 399, 'Fruits', 'Bananas', 'images/banana.jpg'),
(3005, 'Peaches', 2.99, 'Kilo', 500, 'Fruits', 'Peaches', 'images/peach.jpg'),
(3006, 'Grapes', 3.50, 'Kilo', 200, 'Fruits', 'Grapes', 'images/grape.jpg'),
(3007, 'Apples', 1.99, 'Kilo', 500, 'Fruits', 'Apples', 'images/apple.jpg'),
(4000, 'Earl Grey Tea Bags', 2.49, 'Pack 25', 1200, 'Drinks', 'Tea', 'images/tea.jpg'),
(4001, 'Earl Grey Tea Bags', 7.25, 'Pack 100', 1199, 'Drinks', 'Tea', 'images/tea.jpg'),
(4002, 'Earl Grey Tea Bags', 13.00, 'Pack 200', 800, 'Drinks', 'Tea', 'images/tea.jpg'),
(4003, 'Instant Coffee', 2.89, '200 gram', 500, 'Drinks', 'Coffee', 'images/coffee.jpg'),
(4004, 'Instant Coffee', 5.10, '500 gram', 500, 'Drinks', 'Coffee', 'images/coffee.jpg'),
(4005, 'Chocolate Bar', 2.50, '500 gram', 300, 'Desserts', 'Chocolate', 'images/choco.jpg'),
(5000, 'Dry Dog Food', 5.95, '5 kg Pack', 400, 'Pets', 'Dog', 'images/dog_food.jpg'),
(5001, 'Dry Dog Food', 1.95, '1 kg Pack', 400, 'Pets', 'Dog', 'images/dog_food.jpg'),
(5002, 'Bird Food', 3.99, '500g packet', 200, 'Pets', 'Bird', 'images/bird_food.jpeg'),
(5003, 'Cat Food', 2.00, '500g tin', 200, 'Pets', 'Cat', 'images/cat_food.jpg'),
(5004, 'Fish Food', 3.00, '500g packet', 200, 'Pets', 'PetFish', 'images/fish_food.jpeg');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- テーブルのインデックス `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- テーブルの AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5005;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE `DIC_REPOSITORY` (
  `repository_type` int NOT NULL COMMENT '仓库类别',
  `repository_name` varchar(255) NOT NULL COMMENT '仓库名称',
  `freeuse1` int COMMENT '备用1',
  `freeuse2` varchar(255) COMMENT '备用2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `DIC_REPOSITORY` VALUES (1, '1号仓库', null, null);
INSERT INTO `DIC_REPOSITORY` VALUES (2, '2号仓库', null, null);

CREATE TABLE `XS003` (
  `sales_note_id` varchar(50) COMMENT '销售单单据编号',
  `sales_order_note_id` varchar(50) COMMENT '销售订单单据编号',
  `supplier_note_id` varchar(50) COMMENT '采购单单据编号',
  `lend_sales_note_id` varchar(50) COMMENT '借出转销售单单据编号',
  `client_id` varchar(10) COMMENT '客户编号',
  `repository_id` varchar(10) COMMENT '仓库编号',
  `entry_date` date COMMENT '录单日期',
  `collect_date` date COMMENT '收款日期',
  `collect_id` varchar(50) COMMENT '收款账户',
  `collect_balance` double COMMENT '收款金额',
  `discount_balance` double COMMENT '优惠金额',
  `note_status` int COMMENT '单据状态',
  `operator_id` varchar(10) COMMENT '经办人',
  `depart_id` int COMMENT '部门编号',
  `remark` varchar(255) COMMENT '摘要',
  `addition` varchar(255) COMMENT '附加说明',
  `freeuse1` int COMMENT '备用1',
  `freeuse2` varchar(255) COMMENT '备用2',
  `freeuse3` date COMMENT '备用3',
  PRIMARY KEY (sales_note_id),
  KEY idx_sales_note_id (sales_note_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

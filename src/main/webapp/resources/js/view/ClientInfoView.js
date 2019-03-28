Ext.define('AppIndex.view.ClientInfoView',{
    extend:'Ext.panel.Panel',
    xtype:'app_client_info_view',
    itemId: 'app_client_info_view_item_id',
    controller:'client_info_view',

    requires:[
        'AppIndex.controller.ClientInfoController',
        'AppIndex.view.ClientInfoViewGrid'
    ],

    title: '客户信息',
    width: window.innerWidth - 300,
    height: window.innerHeight,
    closable:true,

    layout: {
        type:'border'
    },

    items:[
        {
            region:'center',
            xtype:'app_client_info_view_grid'
        }
    ]
});
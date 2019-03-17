Ext.define('AppIndex.view.UserManagerView',{
    extend:'Ext.panel.Panel',
    xtype:'app_user_manager_view',
    itemId: 'app_user_manager_view_item_id',
    controller:'user_manager_view',

    requires:[
        'AppIndex.controller.UserManagerController',
        'AppIndex.view.UserManagerViewGrid'
    ],

    title: '用户管理',
    width: window.innerWidth - 300,
    height: window.innerHeight,
    closable:true,

    layout: {
        type:'border'
    },

    items:[
        {
            region:'center',
            xtype:'app_user_manager_view_grid'
        }
    ]
});
Ext.define('AppIndex.store.info.GetAllClientInfoStore', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.get_all_client_info_store',

    fields: [
        {name: 'client_id', type: 'int'},
        {name: 'client_name', type: 'string'},
        {name: 'manager', type: 'string'},
        {name: 'phone', type: 'string'}
    ],

    proxy: {
        type : 'ajax',
        actionMethods: {
            read: 'POST'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        reader : {
            type : 'json'
        },
        url : COMMON_DATA.ServerUrl + 'info/GetAllClientInfo',
        noCache:false,
        remoteSort: true
    },
    autoLoad: true
});
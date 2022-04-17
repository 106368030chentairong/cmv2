
$(function(){


    if (!('Notification' in window)) {
        console.log('This browser does not support notification');
    }

    if (Notification.permission === 'default' || Notification.permission === 'undefined') {
        Notification.requestPermission(function(permission) {
            // permission 可為「granted」（同意）、「denied」（拒絕）和「default」（未授權）
            // 在這裡可針對使用者的授權做處理
        });
    }

    function notification_msg(msg){
        var notifyConfig = {
            body: msg, // 設定內容
            icon: './assets/img/icons/crux-logo-metamask.png', // 設定 icon
          };
          
          if (Notification.permission === 'default' || Notification.permission === 'undefined') {
            Notification.requestPermission(function(permission) {
              if (permission === 'granted') {
                // 使用者同意授權
                var notification = new Notification('Hi there!', notifyConfig); // 建立通知
              }
            });
          }
    }

    function get_fleet_table(url, tabel_id, Stardust){
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
    
        $.ajax(settings).done(function (response) {
            //console.log(response);
            $("#"+tabel_id).empty()
            response_tmp = '<tr>'
            $.each(response['data'], function( index, data ) {
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += data['sellerAddress']+'</td>'
        
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += data['nftId']+'</td>'
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += data['priceDM']+'</td>'
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                if (data['isSold']){
                    response_tmp += '<span class="badge bg-label-warning me-1">Sell</span> </td>'
                }else{
                    response_tmp += '<span class="badge bg-label-success me-1">On Sell</span> </td>'
                }
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += (data['priceDM']/Stardust).toFixed(4)+'</td>'
                response_tmp += '</tr>'
            })
            $("#"+tabel_id).append(response_tmp)

            inde_tmp = 0
            if (response["data"][0]["priceDM"] == 0){
                inde_tmp +=1
            }

            if ((response["data"][inde_tmp]["priceDM"]/Stardust)<=0.09){
                $("#"+tabel_id+"_price").addClass("text-danger");
                $("#"+tabel_id+"_dif").addClass("text-danger");
            }else{
                //notification_msg((response["data"][inde_tmp]["priceDM"]/Stardust))
                $("#"+tabel_id+"_price").removeClass("text-danger");
                $("#"+tabel_id+"_dif").removeClass("text-danger");
            }
            $("#"+tabel_id+"_price").text(response["data"][inde_tmp]["priceDM"].toFixed(2)+" DM")
            $("#"+tabel_id+"_dif").text((response["data"][inde_tmp]["priceDM"]/Stardust).toFixed(4)+" ST/DM")
        });    
    };

    var basic_url = "https://api-reborn.cryptomines.app/api/marketplace?"
    var Worker_LV1_url = basic_url+"type=0&rank=1&level=1&page=1&limit=8&sort=priceDM&mpfrom=15&mpto=65"
    var Worker_LV2_url = basic_url+"type=0&rank=2&level=1&page=1&limit=8&sort=priceDM&mpfrom=47&mpto=93"
    var Worker_LV3_url = basic_url+"type=0&rank=3&level=1&page=1&limit=8&sort=priceDM&mpfrom=92&mpto=133"
    var Worker_LV4_url = basic_url+"type=0&rank=4&level=1&page=1&limit=8&sort=priceDM&mpfrom=145&mpto=190"
    var Worker_LV5_url = basic_url+"type=0&rank=5&level=1&page=1&limit=8&sort=priceDM&mpfrom=211&mpto=261"

    get_fleet_table(Worker_LV1_url,"Worker_LV1", 400);
    get_fleet_table(Worker_LV2_url,"Worker_LV2", 445);
    get_fleet_table(Worker_LV3_url,"Worker_LV3", 530);
    get_fleet_table(Worker_LV4_url,"Worker_LV4", 699);
    get_fleet_table(Worker_LV5_url,"Worker_LV5", 1249);

    setInterval(function() {
        get_fleet_table(Worker_LV1_url,"Worker_LV1", 400);
        get_fleet_table(Worker_LV2_url,"Worker_LV2", 445);
        get_fleet_table(Worker_LV3_url,"Worker_LV3", 530);
        get_fleet_table(Worker_LV4_url,"Worker_LV4", 699);
        get_fleet_table(Worker_LV5_url,"Worker_LV5", 1249);

    }, 500);
});
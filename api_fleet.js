
$(function(){

    function get_fleet_table(url, tabel_id, Stardust){
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
    
        $.ajax(settings).done(function (response) {
            console.log(response);
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
                //notification_msg((response["data"][inde_tmp]["priceDM"]/Stardust));
                $("#"+tabel_id+"_price").addClass("text-danger");
                $("#"+tabel_id+"_dif").addClass("text-danger");
            }else{
                $("#"+tabel_id+"_price").removeClass("text-danger");
                $("#"+tabel_id+"_dif").removeClass("text-danger");
            }

            $("#"+tabel_id+"_price").text(response["data"][inde_tmp]["priceDM"].toFixed(2)+" DM")
            $("#"+tabel_id+"_dif").text((Stardust/response["data"][inde_tmp]["priceDM"]).toFixed(4)+" DM/ST")
        });    
    };

    var basic_url = "https://api-reborn.cryptomines.app/api/marketplace?"
    var Fleet_LV1_url = basic_url+"type=1&rank=1&level=1&page=1&limit=8&sort=priceDM&mpfrom=15&mpto=65"
    var Fleet_LV2_url = basic_url+"type=1&rank=2&level=1&page=1&limit=8&sort=priceDM&mpfrom=47&mpto=93"
    var Fleet_LV3_url = basic_url+"type=1&rank=3&level=1&page=1&limit=8&sort=priceDM&mpfrom=92&mpto=133"
    var Fleet_LV4_url = basic_url+"type=1&rank=4&level=1&page=1&limit=8&sort=priceDM&mpfrom=145&mpto=190"
    var Fleet_LV5_url = basic_url+"type=1&rank=5&level=1&page=1&limit=8&sort=priceDM&mpfrom=211&mpto=261"

    get_fleet_table(Fleet_LV1_url,"Fleet_LV1", 400);
    get_fleet_table(Fleet_LV2_url,"Fleet_LV2", 445);
    get_fleet_table(Fleet_LV3_url,"Fleet_LV3", 530);
    get_fleet_table(Fleet_LV4_url,"Fleet_LV4", 699);
    get_fleet_table(Fleet_LV5_url,"Fleet_LV5", 1249);

    setInterval(function() {
        get_fleet_table(Fleet_LV1_url,"Fleet_LV1", 400);
        get_fleet_table(Fleet_LV2_url,"Fleet_LV2", 445);
        get_fleet_table(Fleet_LV3_url,"Fleet_LV3", 530);
        get_fleet_table(Fleet_LV4_url,"Fleet_LV4", 699);
        get_fleet_table(Fleet_LV5_url,"Fleet_LV5", 1249);

    }, 500);
});
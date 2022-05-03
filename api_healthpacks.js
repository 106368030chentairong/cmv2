
$(function(){

    var response_tmp = '<tr>'
    var page_count = 0
    function get_fleet_table(url, tabel_id, Stardust){
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
        };
    
        $.ajax(settings).done(function (response) {
            //console.log(response);
            //$("#"+tabel_id).empty()
            page_count = response['count'];
            $.each(response['data'], function( index, data ) {
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += data['sellerAddress']+'</td>'
        
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += (data['nftData']['value']*1e-18).toFixed(2)+'</td>'
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += data['priceDM']+'</td>'
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                if (data['isSold']){
                    response_tmp += '<span class="badge bg-label-warning me-1">Sell</span> </td>'
                }else{
                    response_tmp += '<span class="badge bg-label-success me-1">On Sell</span> </td>'
                }
                response_tmp += '<td><i class="fab fa-angular fa-lg text-danger me-3"></i>'
                response_tmp += ((data['nftData']['value']*1e-18).toFixed(2)/data['priceDM']).toFixed(2)+'</td>'
                response_tmp += '</tr>'
            })
            $("#"+tabel_id).append(response_tmp)

            inde_tmp = 0
            if (response["data"][0]["priceDM"] == 0){
                inde_tmp +=1
            }

            if ((Stardust/response["data"][inde_tmp]["priceDM"])>=11){
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
    
    $("#"+tabel_id).empty()
    for (step = 1; step < 12; step++) {
        var Worker_LV1_url = basic_url+"type=3&rank=1&level=1&page="+step.toString()+"&limit=500&sort=priceDM"
        get_fleet_table(Worker_LV1_url,"Worker_LV1",1);
    }
    //setInterval(function() {
    //    get_fleet_table(Worker_LV1_url,"Worker_LV1",1);
    //}, 5000);
});
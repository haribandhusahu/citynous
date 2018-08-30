(function (window,google){
    //map option
    var option={
        center={
            lat:17,
            lng:70
        },
        zoom:8
    }
    //map
    var element=document.getElementById("map");
    var map=new google.maps.Map(Element,option);
})(window,google);
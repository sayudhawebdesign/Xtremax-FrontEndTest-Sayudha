function initMap() {
    var merlion = {
        info: '<strong style="font-size: 1.5rem">Merlion</strong><br>\
          <span style="font-size: 1.3rem">The Merlion is the national personification of Singapore<br></span>',
        lat: 1.286920,
        long: 103.854570,
    }

    var museum = {
        info: '<strong style="font-size: 1.5rem">Asian Civilizations Museum</strong><br>\
        <span style="font-size: 1.3rem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br></span>',
        lat: 1.287466,
        long: 103.851424,
    }

    var clarke = {
        info: '<strong style="font-size: 1.5rem">Clarke Quay</strong><br>\
        <span style="font-size: 1.3rem">tempor incididunt ut labore et dolore magna aliqua.<br></span>',
        lat: 1.290555,
        long: 103.846188,
    }
    var fort = {
        info: '<strong style="font-size: 1.5rem">Fort Canning Park</strong><br>\
        <span style="font-size: 1.3rem">Lorem ipsum ut labore et dolore magna aliqua.<br></span>',
        lat: 1.295526,
        long: 103.845331,
    }

    var orchard = {
        info: '<strong style="font-size: 1.5rem">Orchard Road</strong><br>\
        <span style="font-size: 1.3rem">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut labore et dolore aliqua.<br></span>',
        lat: 1.302279,
        long: 103.837399,
    }

    var flyer = {
        info: '<strong style="font-size: 1.5rem">Singapore Flyer</strong><br>\
        <span style="font-size: 1.3rem">adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></span>',
        lat: 1.289332,
        long: 103.863152,
    }

    var marina = {
        info: '<strong style="font-size: 1.5rem">Marina Bay Sands</strong><br>\
        <span style="font-size: 1.3rem">Lorem ipsum dolor sit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></span>',
        lat: 1.283099,
        long: 103.860295,
    }

    var gardens = {
        info: '<strong style="font-size: 1.5rem">Gardens by The Bay</strong><br>\
        <span style="font-size: 1.3rem">Reiusmod tempor incididunt ut labore et dolore magna aliqua.<br></span>',
        lat: 1.281790,
        long: 103.863954,
    }

    var chinatown = {
        info: '<strong style="font-size: 1.5rem">Chinatown</strong><br>\
        <span style="font-size: 1.3rem">Ldo eiusmod tempor incididunt ut labore et dolore magna aliqua.<br></span>',
        lat: 1.284193,
        long: 103.843362,
    }

    // array untuk memanggil objek lokasi
    var locations = [
        [merlion.info, merlion.lat, merlion.long, 0],
        [museum.info, museum.lat, museum.long, 1],
        [clarke.info, clarke.lat, clarke.long, 2],
        [fort.info, fort.lat, fort.long, 3],
        [orchard.info, orchard.lat, orchard.long, 4],
        [flyer.info, flyer.lat, flyer.long, 5],
        [marina.info, marina.lat, marina.long, 6],
        [gardens.info, gardens.lat, gardens.long, 7],
        [chinatown.info, chinatown.lat, chinatown.long, 8]
    ]

    // summon google map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(1.286920, 103.854570),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false
    })

    var infowindow = new google.maps.InfoWindow({})

    // summon marker atau penanda map
    var marker, i, icon1, icon2
        icon1 = 'img/markericon.png';
        icon2 = 'img/markericonbig.png';

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            // icon: '../img/markericon.png'; //rubah icon marker
            icon: icon1
        })

        // --------- Mouseover masih nge-bug, kerjakan nanti bila ada sisa waktu, tidak termasuk specification yg diminta ------------ //

        // google.maps.event.addListener(marker, 'mouseover', function() {
        //     marker.setIcon(icon2);
        // });
        // google.maps.event.addListener(marker, 'mouseout', function() {
        //     marker.setIcon(icon1);
        // });

        // ----------------------------------------------------------------------------------------------------------------------------- //
                
        // fungsi klik (source : https://developers.google.com/maps/documentation/javascript/events)
        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]); //memanggil isi array locations
                    infowindow.open(map, marker);

                    // cara ke-1 untuk zoom 17 dan centering 

                    // memanggil map dengan zoom 17 centering ditengah sesuai lokasi map (map yg lain tidak kena titik karena g ada loop)
                    // var map = new google.maps.Map(document.getElementById('map'), {
                    //     zoom: 17,
                    //     center: new google.maps.LatLng(locations[i][1], locations[i][2]), //locations[i][1], locations[i][2] --> menyesuaikan koordinat
                    //     mapTypeId: google.maps.MapTypeId.ROADMAP,
                    // })

                    // //memanggil marker kembali tanpa pengulangan (hanya ada 1 marker sesuai dgn yg diklik)
                    // var marker = new google.maps.Marker({
                    //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    //     animation: google.maps.Animation.BOUNCE, //tambahan sedikit efek bounce ketika zoom in
                    //     map: map
                    // })

                    // cara ke-2 untuk zoom 17 dan centering

                    map.setZoom(17);
                    map.setCenter(marker.getPosition());
                    document.querySelector(".map__desc").style.opacity = 1;
                    document.querySelector(".map__subnav--title-heading" + [i]).style.color = '#92D72E';
                    document.querySelector("map__subnav--title-btn" + [i]).style.backgroundColor = '#1C1F27';
                   

                }
            })(marker, i)
        )
    }
}
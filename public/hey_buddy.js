$(document).ready(function() {

  var current_position = {
        'latitude': '0.00',
        'longitude': '0.00'
      },
      instagram_options = {
        'client_id': $('#instagram_client_id').val(),
        'access_token': $('#instagram_access_token').val()
      },
      map;

  // draw map using current location as center
  var draw_map = function() {
    var map_center = new google.maps.LatLng(current_position.latitude, current_position.longitude);

    var map_options = {
      center: map_center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map($('#map')[0], map_options);

  }

  var build_instagram_info_window = function(img) {
    var result_string = "<a href="+img.link+" target=_blank><img src='"+img.images.thumbnail.url+"'/></a><br /><i>"+img.user.username+"</i>";
    if(img.caption) {
      result_string += ": "+ img.caption.text;
    }
    return result_string;
  }

  // get instagram photos from the area and place markers for them
  var place_instagram_photos = function() {
    $.getJSON('https://api.instagram.com/v1/media/search?callback=?',
      {
        'lat': current_position.latitude,
        'lng': current_position.longitude,
        'distance': 1000,
        'client_id': instagram_options.client_id
      },
      function(response) {
        console.log("RESP", response);
        $.each(response.data, function(i, img) {
          if(img && img.location && img.link && img.images && img.caption) {
            var position = new google.maps.LatLng(img.location.latitude, img.location.longitude);

            var image = new google.maps.MarkerImage('/images/instagram_logo.png',
              new google.maps.Size(24,24),
              new google.maps.Point(0,0)
            );

            var marker = new google.maps.Marker({
              position: position,
              map: map,
              icon: image
            });

            google.maps.event.addListener(marker, 'click', function() {
              info_window.open(map, marker);
            });

            var info_window = new google.maps.InfoWindow({
              content: build_instagram_info_window(img)
            });
          }
        });
      }
    );

  }

  var place_foursquare_checkins = function() {
  }

  var refresh = function() {
    draw_map();
    place_instagram_photos();
    place_foursquare_checkins();
  }

  var position_success = function(position) {
    // set current location
    current_position.latitude = position.coords.latitude;
    current_position.longitude = position.coords.longitude;
    refresh();
  }

  var position_failure = function(position) {
    $('#no_location').fadeIn(400);
  }

  navigator.geolocation.getCurrentPosition(position_success, position_failure);

});

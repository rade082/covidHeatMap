function updateMap(map){
    fetch("https://www.trackcorona.live/api/countries")
    .then(response=> response.json())
    .then(resp => {
        // console.log(resp.data);
        resp.data.forEach(element => {
            lat = element.latitude;
            lon = element.longitude;
            conf = element.confirmed; 

            var marker = new mapboxgl.Marker({
              draggable: false
              })
              .setLngLat([lon,lat])
              .addTo(map);

              var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
                });
                
                map.on('mouseenter', 'places', function (e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                     
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = e.features[0].properties.description;
                     
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                     
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(description).addTo(map);
                    });
                     
                    map.on('mouseleave', 'places', function () {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                    });
        });
    })
}


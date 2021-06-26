function updateMap(map){
    
    fetch("https://www.trackcorona.live/api/countries")
    .then(response=> response.json())
    .then(resp => {
        // console.log(resp.data);
        resp.data.forEach(element => {
            let lat = element.latitude;
            let lon = element.longitude;
            let confirm = element.confirmed; 
            let loc = element.location;
            let dead = element.dead;
            let recovered = element.recovered;

            let text = '<h5>'+loc+'</h5><br>'+
            'Confirmed: <strong class="text-warning">'+confirm+'</strong><br/>'+
            'Recovered: <strong class="text-success">'+recovered+'</strong><br/>'+
            'Dead: <strong class="text-danger">'+dead+'</strong>'
            ;


            let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
               text
                );

                let el = document.createElement('div');
            el.id = 'marker';

            let marker = new mapboxgl.Marker({
                color: "coral",
                scale:0.5,
              draggable: false
              })
              .setLngLat([lon,lat])
              .setPopup(popup)
              .addTo(map);
                 
              const markerDiv = marker.getElement();

              markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
              markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
    
        });
    });      
}


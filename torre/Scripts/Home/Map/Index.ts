namespace torre.Home.Map {

    import MarkerViewModel = T4TS.MarkerViewModel;
    import Coordinate = T4TS.Coordinate;

    export class Index {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;

        constructor(center: Coordinate, zoom: number) {
            this.loadMap(center, zoom);
        }

        private loadMap(center: Coordinate, zoom: number): void {

            var calgary = { lat: center.Latitude, lng: center.Longitude };
            this.map = new google.maps.Map(document.getElementById('map'), { zoom: zoom, center: calgary });

            this.infoWindow = new google.maps.InfoWindow();

            $.ajax("/features/markers",
                {
                    success: (markers: any) => {

                        for (var i in markers) {
                            var markerViewModel = markers[i] as MarkerViewModel;

                            var content = "<h3>" + markerViewModel.Name + "</h3>";

                            var marker = new google.maps.Marker({
                                position: { lat: markerViewModel.Latitude, lng: markerViewModel.Longitude },
                                map: this.map
                            });

                            google.maps.event.addListener(marker, 'click', ((marker, content, infoWindow) =>
                                () => {
                                    infoWindow.close();
                                    infoWindow.setContent(content);
                                    infoWindow.open(this.map, marker);
                                })(marker, content, this.infoWindow));  
                        }
                    }
                });
        }
    }
}

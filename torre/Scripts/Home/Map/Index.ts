namespace torre.Home.Map {

    import MarkerViewModel = T4TS.MarkerViewModel;

    export class Index {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;

        constructor() {
            this.loadMap();
        }

        private loadMap(): void {

            var calgary = { lat: 51.053952, lng: -114.070596 };
            this.map = new google.maps.Map(document.getElementById('map'), { zoom: 4, center: calgary });

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

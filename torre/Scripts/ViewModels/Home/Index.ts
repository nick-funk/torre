namespace torre.ViewModels.Home {

    import MarkerViewModel = T4TS.MarkerViewModel;
    import Coordinate = T4TS.Coordinate;

    export class Index {
        private map: Maps.Map;

        constructor(center: Coordinate, zoom: number) {
            this.map = new Maps.Map(center.Latitude, center.Longitude, zoom, "map");

            this.loadMarkers();
        }

        private loadMarkers(): void {
            $.ajax("/features/markers",
                {
                    success: (markers: Array<MarkerViewModel>) => {
                        for (var i in markers) {
                            var markerViewModel = markers[i];

                            var content = "<h3>" + markerViewModel.Name + "</h3>";

                            this.map.addMarker(markerViewModel.Latitude, markerViewModel.Longitude, content);
                        }
                    }
                });
        }
    }
}

namespace torre.ViewModels.Home {

    import MarkerViewModel = T4TS.MarkerViewModel;
    import Coordinate = T4TS.Coordinate;
    import Map = Maps.Map;

    export class Index {
        private map: Maps.Map;
        private editor: Maps.Editor;
        private properties: Maps.Properties;

        constructor(center: Coordinate, zoom: number) {
            this.map = new Maps.Map(center.Latitude, center.Longitude, zoom, "map");
            this.editor = new Maps.Editor(this.map);
            this.properties = new Maps.Properties(this.map);

            this.map.addLoader(this.loadMarkers);
            this.map.refresh();
        }

        private loadMarkers(map: Map): void {
            $.ajax("/map/markers",
                {
                    success: (markers: Array<MarkerViewModel>) => {
                        for (var i in markers) {
                            var markerViewModel = markers[i];

                            var content = "<h4>" + markerViewModel.Name + "</h4>";

                            map.addMarker(markerViewModel.Id, markerViewModel.Latitude, markerViewModel.Longitude, content);
                        }
                    }
                });
        }
    }
}

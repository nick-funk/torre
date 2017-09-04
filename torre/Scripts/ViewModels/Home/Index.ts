namespace torre.ViewModels.Home {
    import Coordinate = T4TS.Coordinate;
    import Map = Maps.Map;
    import MarkerModel = T4TS.MarkerModel;

    export class Index {
        private map: Maps.Map;
        private editor: Maps.Editor;
        private properties: Maps.Properties;

        constructor(center: Coordinate, zoom: number) {
            this.map = new Maps.Map(center.Latitude, center.Longitude, zoom, "map", true);
            this.editor = new Maps.Editor(this.map);
            this.properties = new Maps.Properties(this.map);

            this.map.addLoader(this.loadMarkers);
            this.map.refresh();
        }

        private loadMarkers(map: Map): void {
            $.ajax("/api/marker/all",
                {
                    success: (markers: Array<MarkerModel>) => {
                        for (var i in markers) {
                            var model = markers[i];

                            var content = "<h4>" + model.Name + "</h4>";

                            if (model.Content) {
                                content += model.Content;
                            }

                            map.addMarker(model.Id, model.Latitude, model.Longitude, content, model.Icon);
                        }
                    }
                });
        }
    }
}

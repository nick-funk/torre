var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Home;
        (function (Home) {
            class Index {
                constructor(center, zoom) {
                    this.map = new torre.Maps.Map(center.Latitude, center.Longitude, zoom, "map", true);
                    this.editor = new torre.Maps.Editor(this.map);
                    this.properties = new torre.Maps.Properties(this.map);
                    this.map.addLoader(this.loadMarkers);
                }
                loadMarkers(map) {
                    var bounds = map.getBounds();
                    var ne = bounds.getNorthEast();
                    var sw = bounds.getSouthWest();
                    $.ajax({
                        url: "/api/marker/all",
                        type: "GET",
                        data: {
                            nwLatitude: ne.lat(),
                            nwLongitude: sw.lng(),
                            seLatitude: sw.lat(),
                            seLongitude: ne.lng()
                        },
                        success: (markers) => {
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
            Home.Index = Index;
        })(Home = ViewModels.Home || (ViewModels.Home = {}));
    })(ViewModels = torre.ViewModels || (torre.ViewModels = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Index.js.map
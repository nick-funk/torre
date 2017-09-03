var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Home;
        (function (Home) {
            var Index = (function () {
                function Index(center, zoom) {
                    this.map = new torre.Maps.Map(center.Latitude, center.Longitude, zoom, "map", true);
                    this.editor = new torre.Maps.Editor(this.map);
                    this.properties = new torre.Maps.Properties(this.map);
                    this.map.addLoader(this.loadMarkers);
                    this.map.refresh();
                }
                Index.prototype.loadMarkers = function (map) {
                    $.ajax("/api/marker/all", {
                        success: function (markers) {
                            for (var i in markers) {
                                var model = markers[i];
                                var content = "<h4>" + model.Name + "</h4>";
                                if (model.Content) {
                                    content += model.Content;
                                }
                                map.addMarker(model.Id, model.Latitude, model.Longitude, content);
                            }
                        }
                    });
                };
                return Index;
            }());
            Home.Index = Index;
        })(Home = ViewModels.Home || (ViewModels.Home = {}));
    })(ViewModels = torre.ViewModels || (torre.ViewModels = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Index.js.map
var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Home;
        (function (Home) {
            var Index = (function () {
                function Index(center, zoom) {
                    this.map = new torre.Maps.Map(center.Latitude, center.Longitude, zoom, "map");
                    this.editor = new torre.Maps.Editor(this.map);
                    this.properties = new torre.Maps.Properties(this.map);
                    this.map.addLoader(this.loadMarkers);
                    this.map.refresh();
                }
                Index.prototype.loadMarkers = function (map) {
                    $.ajax("/map/markers", {
                        success: function (markers) {
                            for (var i in markers) {
                                var markerViewModel = markers[i];
                                var content = "<h4>" + markerViewModel.Name + "</h4>";
                                map.addMarker(markerViewModel.Id, markerViewModel.Latitude, markerViewModel.Longitude, content);
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
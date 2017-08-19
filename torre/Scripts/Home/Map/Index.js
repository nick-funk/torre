var torre;
(function (torre) {
    var Home;
    (function (Home) {
        var Map;
        (function (Map) {
            var Index = (function () {
                function Index(center, zoom) {
                    this.map = new torre.Maps.Map(center.Latitude, center.Longitude, zoom, "map");
                    this.loadMarkers();
                }
                Index.prototype.loadMarkers = function () {
                    var _this = this;
                    $.ajax("/features/markers", {
                        success: function (markers) {
                            for (var i in markers) {
                                var markerViewModel = markers[i];
                                var content = "<h3>" + markerViewModel.Name + "</h3>";
                                _this.map.addMarker(markerViewModel.Latitude, markerViewModel.Longitude, content);
                            }
                        }
                    });
                };
                return Index;
            }());
            Map.Index = Index;
        })(Map = Home.Map || (Home.Map = {}));
    })(Home = torre.Home || (torre.Home = {}));
})(torre || (torre = {}));

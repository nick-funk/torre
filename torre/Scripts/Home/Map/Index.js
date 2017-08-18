var torre;
(function (torre) {
    var Home;
    (function (Home) {
        var Map;
        (function (Map) {
            var Index = (function () {
                function Index(center, zoom) {
                    this.loadMap(center, zoom);
                }
                Index.prototype.loadMap = function (center, zoom) {
                    var _this = this;
                    var calgary = { lat: center.Latitude, lng: center.Longitude };
                    this.map = new google.maps.Map(document.getElementById('map'), { zoom: zoom, center: calgary });
                    this.infoWindow = new google.maps.InfoWindow();
                    $.ajax("/features/markers", {
                        success: function (markers) {
                            for (var i in markers) {
                                var markerViewModel = markers[i];
                                var content = "<h3>" + markerViewModel.Name + "</h3>";
                                var marker = new google.maps.Marker({
                                    position: { lat: markerViewModel.Latitude, lng: markerViewModel.Longitude },
                                    map: _this.map
                                });
                                google.maps.event.addListener(marker, 'click', (function (marker, content, infoWindow) {
                                    return function () {
                                        infoWindow.close();
                                        infoWindow.setContent(content);
                                        infoWindow.open(_this.map, marker);
                                    };
                                })(marker, content, _this.infoWindow));
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

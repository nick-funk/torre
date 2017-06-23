var torre;
(function (torre) {
    var Home;
    (function (Home) {
        var Map;
        (function (Map) {
            var Index = (function () {
                function Index() {
                    this.loadMap();
                }
                Index.prototype.loadMap = function () {
                    var _this = this;
                    var iconOptions = {
                        iconUrl: "/content/images/marker-icon-2x.png",
                        shadowUrl: "/content/images/marker-shadow.png",
                        iconSize: [25, 40],
                        shadowSize: [25, 40],
                        iconAnchor: [12, 40],
                        shadowAnchor: [7, 40],
                        popupAnchor: [0, -40]
                    };
                    var iconInstance = new L.Icon((iconOptions));
                    var markerOptions = {
                        icon: iconInstance
                    };
                    this.map = L.map('map');
                    var layer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
                    });
                    layer.addTo(this.map);
                    $.ajax("/features/markers", {
                        success: function (markers) {
                            for (var i in markers) {
                                var markerViewModel = markers[i];
                                var position = new L.LatLng(markerViewModel.Latitude, markerViewModel.Longitude);
                                var marker = new L.Marker(position, markerOptions);
                                marker.addTo(_this.map).bindPopup("<b>" + markerViewModel.Name + "</b>").openPopup();
                            }
                            _this.map.setView(new L.LatLng(51.053952, -114.070596), 15);
                        }
                    });
                };
                return Index;
            }());
            Map.Index = Index;
        })(Map = Home.Map || (Home.Map = {}));
    })(Home = torre.Home || (torre.Home = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Index.js.map
var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Uuid = torre.Utilities.Uuid;
        var Map = (function () {
            function Map(centerLat, centerLong, zoom, targetDiv) {
                this.markers = {};
                this.loadMap(centerLat, centerLong, zoom, targetDiv);
            }
            Map.prototype.loadMap = function (centerLat, centerLong, zoom, targetDiv) {
                var centerTo = { lat: centerLat, lng: centerLong };
                this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });
                this.infoWindow = new google.maps.InfoWindow();
            };
            Map.prototype.addMarker = function (latitude, longitude, content) {
                var _this = this;
                var id = Uuid.create();
                var marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: this.map
                });
                var listener = google.maps.event.addListener(marker, 'click', (function (marker, content, infoWindow) {
                    return function () {
                        infoWindow.close();
                        infoWindow.setContent(content);
                        infoWindow.open(_this.map, marker);
                    };
                })(marker, content, this.infoWindow));
                this.markers[id] = {
                    marker: marker,
                    clickEvent: listener
                };
                return id;
            };
            Map.prototype.removeMarker = function (id) {
                var details = this.markers[id];
                if (details) {
                    var marker = details["marker"];
                    var clickEvent = details["clickEvent"];
                    google.maps.event.removeListener(clickEvent);
                    marker.setMap(null);
                }
            };
            Map.prototype.center = function (latitude, longitude) {
                this.map.setCenter(new google.maps.LatLng(latitude, longitude));
            };
            return Map;
        }());
        Maps.Map = Map;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Map.js.map
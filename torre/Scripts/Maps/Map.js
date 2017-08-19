var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Map = (function () {
            function Map(centerLat, centerLong, zoom, targetDiv) {
                this.loadMap(centerLat, centerLong, zoom, targetDiv);
            }
            Map.prototype.loadMap = function (centerLat, centerLong, zoom, targetDiv) {
                var centerTo = { lat: centerLat, lng: centerLong };
                this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });
                this.infoWindow = new google.maps.InfoWindow();
            };
            Map.prototype.addMarker = function (latitude, longitude, content) {
                var _this = this;
                var marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: this.map
                });
                google.maps.event.addListener(marker, 'click', (function (marker, content, infoWindow) {
                    return function () {
                        infoWindow.close();
                        infoWindow.setContent(content);
                        infoWindow.open(_this.map, marker);
                    };
                })(marker, content, this.infoWindow));
            };
            return Map;
        }());
        Maps.Map = Map;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));

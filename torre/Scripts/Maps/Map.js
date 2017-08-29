var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Map = (function () {
            function Map(centerLat, centerLong, zoom, targetDiv) {
                this.markers = [];
                this.loaders = [];
                this.loadMap(centerLat, centerLong, zoom, targetDiv);
            }
            Map.prototype.loadMap = function (centerLat, centerLong, zoom, targetDiv) {
                var centerTo = { lat: centerLat, lng: centerLong };
                this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });
                this.infoWindow = new google.maps.InfoWindow();
            };
            Map.prototype.addLoader = function (loader) {
                this.loaders.push(loader);
            };
            Map.prototype.refresh = function () {
                for (var i = 0; i < this.loaders.length; i++) {
                    this.loaders[i](this);
                }
            };
            Map.prototype.addMarker = function (id, latitude, longitude, content) {
                var _this = this;
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
                })(marker, this.formatContent(id, content), this.infoWindow));
                this.markers[id] = new Maps.Marker(id, latitude, longitude, listener, marker);
                return id;
            };
            Map.prototype.removeMarker = function (id) {
                var marker = this.markers[id];
                if (marker) {
                    $.ajax({
                        url: "/api/marker/remove",
                        type: "POST",
                        data: {
                            id: marker.id
                        }
                    });
                    google.maps.event.removeListener(marker.clickEvent);
                    marker.mapMarker.setMap(null);
                    delete this.markers[id];
                }
            };
            Map.prototype.removeMarkersNear = function (latitude, longitude) {
                for (var i in this.markers) {
                    var marker = this.markers[i];
                    var radius = this.getLongWidth() / 100;
                    if (marker.isNear(latitude, longitude, radius)) {
                        this.removeMarker(marker.id);
                    }
                }
            };
            Map.prototype.center = function (latitude, longitude) {
                this.map.setCenter(new google.maps.LatLng(latitude, longitude));
            };
            Map.prototype.addEvent = function (type, handler) {
                this.map.addListener(type, handler);
            };
            Map.prototype.setCursor = function (name) {
                this.map.setOptions({ draggableCursor: name });
            };
            Map.prototype.getLongWidth = function () {
                var bounds = this.map.getBounds();
                return bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
            };
            Map.prototype.formatContent = function (id, content) {
                var html = "<div>" + content + "</div>";
                html += "<div class=\"uk-text-center uk-grid-small\" uk-grid>\n                        <div class=\"uk-width-1-3\">\n                            <button class=\"uk-button uk-button-small uk-button-danger\" onclick=\"viewModel.map.removeMarker('" + id + "')\">Delete</button>\n                        </div>\n                     </div>";
                return html;
            };
            return Map;
        }());
        Maps.Map = Map;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Map.js.map
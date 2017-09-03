var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Map = (function () {
            function Map(centerLat, centerLong, zoom, targetDiv, editable) {
                if (editable === void 0) { editable = false; }
                this.editable = editable;
                this.markers = [];
                this.loaders = [];
                this.selectedItem = ko.observable(null);
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
                if (this.markers[id]) {
                    this.removeMarkerVisuals(id, this.markers[id]);
                }
                var marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: this.map
                });
                var listener = google.maps.event.addListener(marker, 'click', (function (marker, infoContent) {
                    return function () {
                        _this.select(id, infoContent);
                    };
                })(marker, content));
                this.markers[id] = new Maps.Marker(id, latitude, longitude, listener, marker);
                return id;
            };
            Map.prototype.select = function (id, content) {
                var mapMarker = this.markers[id].mapMarker;
                this.infoWindow.close();
                this.infoWindow.setContent(this.formatContent(id, content));
                this.infoWindow.open(this.map, mapMarker);
                this.selectedItem(new Maps.SelectedItem(id, Maps.MapItemType.marker));
            };
            Map.prototype.removeMarker = function (id) {
                var marker = this.markers[id];
                if (marker && this.editable) {
                    $.ajax({
                        url: "/api/marker/remove",
                        type: "POST",
                        data: {
                            id: marker.id
                        }
                    });
                }
                this.removeMarkerVisuals(id, marker);
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
            Map.prototype.removeMarkerVisuals = function (id, marker) {
                if (this.selectedItem().id === id) {
                    this.infoWindow.close();
                }
                google.maps.event.removeListener(marker.clickEvent);
                marker.mapMarker.setMap(null);
                delete this.markers[id];
            };
            Map.prototype.formatContent = function (id, content) {
                var html = "<div>" + content + "</div><div class=\"gap\"></div>";
                if (this.editable) {
                    html += "<div class=\"uk-grid-small\" uk-grid>\n                            <div class=\"uk-width-1-2\">\n                                <button class=\"uk-button uk-button-small uk-button-danger\" onclick=\"viewModel.map.removeMarker('" + id + "')\">Delete</button>\n                            </div>\n                            <div class=\"uk-width-1-2\">\n                                <a class=\"uk-button uk-button-small uk-button-primary\" href=\"/marker/edit/" + id + "\">Edit</a>\n                            </div>\n                        </div>";
                }
                return html;
            };
            return Map;
        }());
        Maps.Map = Map;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Map.js.map
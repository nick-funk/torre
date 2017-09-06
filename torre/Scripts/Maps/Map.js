var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        class Map {
            constructor(centerLat, centerLong, zoom, targetDiv, editable = false) {
                this.editable = editable;
                this.markers = [];
                this.loaders = [];
                this.selectedItem = ko.observable(null);
                this.loadMap(centerLat, centerLong, zoom, targetDiv);
                this.map.addListener("tilesloaded", () => this.onTilesLoaded());
                this.map.addListener("idle", () => this.refresh());
            }
            loadMap(centerLat, centerLong, zoom, targetDiv) {
                var centerTo = { lat: centerLat, lng: centerLong };
                this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });
                this.infoWindow = new google.maps.InfoWindow();
            }
            addLoader(loader) {
                this.loaders.push(loader);
            }
            refresh() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.selectedItem(null);
                    for (var id in this.markers) {
                        this.removeMarkerVisuals(id, this.markers[id]);
                    }
                    for (var i = 0; i < this.loaders.length; i++) {
                        this.loaders[i](this);
                    }
                });
            }
            addMarker(id, latitude, longitude, content, icon = null) {
                if (this.markers[id]) {
                    this.removeMarkerVisuals(id, this.markers[id]);
                }
                var marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    icon: icon,
                    map: this.map
                });
                var listener = google.maps.event.addListener(marker, 'click', ((marker, infoContent) => () => {
                    this.select(id, infoContent);
                })(marker, content));
                this.markers[id] = new Maps.Marker(id, latitude, longitude, listener, marker);
                return id;
            }
            select(id, content) {
                var mapMarker = this.markers[id].mapMarker;
                this.infoWindow.close();
                this.infoWindow.setContent(this.formatContent(id, content));
                this.infoWindow.open(this.map, mapMarker);
                this.selectedItem(new Maps.SelectedItem(id, Maps.MapItemType.marker));
            }
            removeMarker(id) {
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
            }
            removeMarkersNear(latitude, longitude) {
                for (var i in this.markers) {
                    var marker = this.markers[i];
                    var radius = this.getLongWidth() / 100;
                    if (marker.isNear(latitude, longitude, radius)) {
                        this.removeMarker(marker.id);
                    }
                }
            }
            center(latitude, longitude) {
                this.map.setCenter(new google.maps.LatLng(latitude, longitude));
            }
            addEvent(type, handler) {
                this.map.addListener(type, handler);
            }
            setCursor(name) {
                this.map.setOptions({ draggableCursor: name });
            }
            getLongWidth() {
                var bounds = this.map.getBounds();
                return bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
            }
            getBounds() {
                return this.map.getBounds();
            }
            onTilesLoaded() {
                this.refresh();
                google.maps.event.clearListeners(this.map, "tilesloaded");
            }
            removeMarkerVisuals(id, marker) {
                if (this.selectedItem() && this.selectedItem().id === id) {
                    this.infoWindow.close();
                    this.selectedItem(null);
                }
                google.maps.event.removeListener(marker.clickEvent);
                marker.mapMarker.setMap(null);
                delete this.markers[id];
            }
            formatContent(id, content) {
                var html = `<div>${content}</div>`;
                if (this.editable) {
                    html += `<div class="gap"></div>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-2">
                                <button class="uk-button uk-button-small uk-button-danger" onclick="viewModel.map.removeMarker('${id}')">Delete</button>
                            </div>
                            <div class="uk-width-1-2">
                                <a class="uk-button uk-button-small uk-button-primary" href="/marker/edit/${id}">Edit</a>
                            </div>
                        </div>`;
                }
                return html;
            }
        }
        Maps.Map = Map;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Map.js.map
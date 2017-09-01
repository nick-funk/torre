var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Uuid = torre.Utilities.Uuid;
        var Editor = (function () {
            function Editor(map) {
                var _this = this;
                this.map = map;
                this.setupMapClickEvents();
                this.map.selectedItem.subscribe(function (item) { return _this.onItemSelected(item); });
                this.propertiesName = ko.observable("");
                this.selectedId = ko.observable("");
                var root = document.getElementById("editor");
                ko.applyBindings(this, root);
            }
            Editor.prototype.setMode = function (mode) {
                this.mode = mode;
                this.map.setCursor("crosshair");
            };
            Editor.prototype.saveProperties = function () {
                var _this = this;
                $.ajax({
                    url: "/api/marker/update",
                    type: "POST",
                    data: {
                        id: this.selectedId(),
                        name: this.propertiesName()
                    },
                    success: function () {
                        _this.reloadMarker(_this.selectedId());
                    }
                });
            };
            Editor.prototype.setupMapClickEvents = function () {
                var editor = this;
                this.map.addEvent('click', function (args) { return editor.onClick(args); });
                this.map.addEvent('rightclick', function (args) { return editor.onRightClick(args); });
            };
            Editor.prototype.onClick = function (args) {
                var latitude = args.latLng.lat();
                var longitude = args.latLng.lng();
                if (this.mode === "marker") {
                    this.addMarker(longitude, latitude);
                }
                if (this.mode === "remove-marker") {
                    this.removeMarker(longitude, latitude);
                }
            };
            Editor.prototype.onRightClick = function (args) {
                this.mode = "";
                this.map.setCursor(null);
            };
            Editor.prototype.onItemSelected = function (item) {
                if (item.type.id === Maps.MapItemType.marker.id) {
                    this.showMarkerProperties(item.id);
                }
            };
            Editor.prototype.showMarkerProperties = function (id) {
                var _this = this;
                $.ajax({
                    url: "/api/marker/get",
                    type: "GET",
                    data: {
                        id: id
                    },
                    success: function (marker) {
                        _this.selectedId(marker.Id);
                        _this.propertiesName(marker.Name);
                    }
                });
            };
            Editor.prototype.addMarker = function (longitude, latitude) {
                var _this = this;
                var id = Uuid.create();
                var name = "Unknown";
                $.ajax({
                    url: "/api/marker/add",
                    type: "POST",
                    data: {
                        id: id,
                        name: name,
                        latitude: latitude,
                        longitude: longitude
                    },
                    success: function () {
                        var content = "<h4>" + name + "</h4>";
                        _this.map.addMarker(id, latitude, longitude, content);
                        _this.propertiesName(name);
                        _this.selectedId(id);
                    }
                });
            };
            Editor.prototype.removeMarker = function (longitude, latitude) {
                this.map.removeMarkersNear(latitude, longitude);
            };
            Editor.prototype.reloadMarker = function (id) {
                var _this = this;
                $.ajax({
                    url: "/api/marker/get",
                    type: "GET",
                    data: {
                        id: id
                    },
                    success: function (marker) {
                        var content = "<h4>" + marker.Name + "</h4>";
                        _this.map.addMarker(id, marker.Latitude, marker.Longitude, content);
                        _this.map.select(marker.Id, content);
                    }
                });
            };
            return Editor;
        }());
        Maps.Editor = Editor;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Editor.js.map
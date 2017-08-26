var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Editor = (function () {
            function Editor(map) {
                this.map = map;
                this.markers = new Array();
                var editor = this;
                this.map.addEvent('click', function (args) { return editor.onClick(args); });
                this.map.addEvent('rightclick', function (args) { return editor.onRightClick(args); });
                var root = document.getElementById("editor");
                ko.applyBindings(this, root);
            }
            Editor.prototype.setMode = function (mode) {
                this.mode = mode;
                this.map.setCursor("crosshair");
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
            Editor.prototype.addMarker = function (longitude, latitude) {
                var id = this.map.addMarker(latitude, longitude, "TEST");
                this.markers.push(new Maps.Marker(id, latitude, longitude));
            };
            Editor.prototype.removeMarker = function (longitude, latitude) {
                for (var i = 0; i < this.markers.length; i++) {
                    var marker = this.markers[i];
                    var radius = this.map.getLongWidth() / 100;
                    if (marker.isNear(latitude, longitude, radius)) {
                        this.map.removeMarker(marker.id);
                        this.markers.splice(i, 1);
                        i--;
                    }
                }
            };
            return Editor;
        }());
        Maps.Editor = Editor;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Editor.js.map
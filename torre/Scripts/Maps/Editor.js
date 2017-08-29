var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Uuid = torre.Utilities.Uuid;
        var Editor = (function () {
            function Editor(map) {
                this.map = map;
                this.setupMapClickEvents();
                this.selectedName = ko.observable("");
                this.selectedId = ko.observable("");
                var root = document.getElementById("editor");
                ko.applyBindings(this, root);
            }
            Editor.prototype.setMode = function (mode) {
                this.mode = mode;
                this.map.setCursor("crosshair");
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
                        _this.map.addMarker(id, latitude, longitude, name);
                        _this.selectedName(name);
                        _this.selectedId(id);
                    }
                });
            };
            Editor.prototype.removeMarker = function (longitude, latitude) {
                this.map.removeMarkersNear(latitude, longitude);
            };
            return Editor;
        }());
        Maps.Editor = Editor;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Editor.js.map
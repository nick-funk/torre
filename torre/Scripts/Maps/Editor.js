var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Editor = (function () {
            function Editor(map) {
                this.map = map;
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
            };
            Editor.prototype.onRightClick = function (args) {
                this.mode = "";
                this.map.setCursor(null);
            };
            Editor.prototype.addMarker = function (longitude, latitude) {
                var id = this.map.addMarker(latitude, longitude, "TEST");
            };
            return Editor;
        }());
        Maps.Editor = Editor;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Editor.js.map
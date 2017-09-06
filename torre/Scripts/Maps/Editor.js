var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Uuid = torre.Utilities.Uuid;
        class Editor {
            constructor(map) {
                this.map = map;
                this.setupMapClickEvents();
                let root = document.getElementById("editor");
                ko.applyBindings(this, root);
            }
            setMode(mode) {
                this.mode = mode;
                this.map.setCursor("crosshair");
            }
            setupMapClickEvents() {
                var editor = this;
                this.map.addEvent('click', (args) => editor.onClick(args));
                this.map.addEvent('rightclick', (args) => editor.onRightClick(args));
            }
            onClick(args) {
                var latitude = args.latLng.lat();
                var longitude = args.latLng.lng();
                if (this.mode === "marker") {
                    this.addMarker(longitude, latitude);
                }
                if (this.mode === "remove-marker") {
                    this.removeMarker(longitude, latitude);
                }
            }
            onRightClick(args) {
                this.mode = "";
                this.map.setCursor(null);
            }
            addMarker(longitude, latitude) {
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
                    success: () => {
                        var content = `<h4>${name}</h4>`;
                        this.map.addMarker(id, latitude, longitude, content);
                    }
                });
            }
            removeMarker(longitude, latitude) {
                this.map.removeMarkersNear(latitude, longitude);
            }
        }
        Maps.Editor = Editor;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Editor.js.map
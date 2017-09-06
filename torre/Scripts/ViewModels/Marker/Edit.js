var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Marker;
        (function (Marker) {
            var Uuid = torre.Utilities.Uuid;
            class Edit {
                constructor() {
                    let latDiv = $("#Latitude");
                    let longDiv = $("#Longitude");
                    latDiv.on("change", () => this.updateCenter());
                    longDiv.on("change", () => this.updateCenter());
                    this.map = new torre.Maps.Map(0, 0, 15, "map");
                    this.markerId = Uuid.create();
                    this.updateCenter();
                }
                updateCenter() {
                    let latDiv = $("#Latitude");
                    let longDiv = $("#Longitude");
                    let latitude = parseFloat(latDiv.val());
                    let longitude = parseFloat(longDiv.val());
                    this.map.center(latitude, longitude);
                    this.map.addMarker(this.markerId, latitude, longitude, "");
                }
            }
            Marker.Edit = Edit;
        })(Marker = ViewModels.Marker || (ViewModels.Marker = {}));
    })(ViewModels = torre.ViewModels || (torre.ViewModels = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Edit.js.map
var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Marker;
        (function (Marker) {
            var Edit = (function () {
                function Edit() {
                    var _this = this;
                    var latDiv = $("#Latitude");
                    var longDiv = $("#Longitude");
                    latDiv.on("change", function () { return _this.updateCenter(); });
                    longDiv.on("change", function () { return _this.updateCenter(); });
                    this.map = new torre.Maps.Map(0, 0, 15, "map");
                    this.updateCenter();
                }
                Edit.prototype.updateCenter = function () {
                    if (this.markerId) {
                        this.map.removeMarker(this.markerId);
                    }
                    var latDiv = $("#Latitude");
                    var longDiv = $("#Longitude");
                    var latitude = parseFloat(latDiv.val());
                    var longitude = parseFloat(longDiv.val());
                    this.map.center(latitude, longitude);
                    this.markerId = this.map.addMarker(latitude, longitude, "");
                };
                return Edit;
            }());
            Marker.Edit = Edit;
        })(Marker = ViewModels.Marker || (ViewModels.Marker = {}));
    })(ViewModels = torre.ViewModels || (torre.ViewModels = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Edit.js.map
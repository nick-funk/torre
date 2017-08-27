var torre;
(function (torre) {
    var ViewModels;
    (function (ViewModels) {
        var Marker;
        (function (Marker) {
            var Uuid = torre.Utilities.Uuid;
            var Add = (function () {
                function Add() {
                    var _this = this;
                    var latDiv = $("#Latitude");
                    var longDiv = $("#Longitude");
                    latDiv.on("change", function () { return _this.updateCenter(); });
                    longDiv.on("change", function () { return _this.updateCenter(); });
                    this.map = new torre.Maps.Map(0, 0, 15, "map");
                    this.updateCenter();
                }
                Add.prototype.updateCenter = function () {
                    if (this.markerId) {
                        this.map.removeMarker(this.markerId);
                    }
                    var latDiv = $("#Latitude");
                    var longDiv = $("#Longitude");
                    var latitude = parseFloat(latDiv.val());
                    var longitude = parseFloat(longDiv.val());
                    this.map.center(latitude, longitude);
                    this.markerId = Uuid.create();
                    this.map.addMarker(this.markerId, latitude, longitude, "");
                };
                return Add;
            }());
            Marker.Add = Add;
        })(Marker = ViewModels.Marker || (ViewModels.Marker = {}));
    })(ViewModels = torre.ViewModels || (torre.ViewModels = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Add.js.map
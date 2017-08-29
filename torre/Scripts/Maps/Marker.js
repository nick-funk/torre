var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Marker = (function () {
            function Marker(id, latitude, longitude, clickEvent, mapMarker) {
                this.id = id;
                this.longitude = longitude;
                this.latitude = latitude;
                this.clickEvent = clickEvent;
                this.mapMarker = mapMarker;
            }
            Marker.prototype.isNear = function (latitude, longitude, radius) {
                return latitude >= this.latitude - radius * 2 &&
                    latitude <= this.latitude + radius * 2 &&
                    longitude >= this.longitude - radius &&
                    longitude <= this.longitude + radius;
            };
            return Marker;
        }());
        Maps.Marker = Marker;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Marker.js.map
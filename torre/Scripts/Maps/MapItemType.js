var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var MapItemType = (function () {
            function MapItemType(id, name) {
                this.id = id;
                this.name = name;
            }
            return MapItemType;
        }());
        MapItemType.marker = new MapItemType(0, "Marker");
        Maps.MapItemType = MapItemType;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=MapItemType.js.map
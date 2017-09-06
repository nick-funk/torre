var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        class MapItemType {
            constructor(id, name) {
                this.id = id;
                this.name = name;
            }
        }
        MapItemType.marker = new MapItemType(0, "Marker");
        Maps.MapItemType = MapItemType;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=MapItemType.js.map
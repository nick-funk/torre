var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var SelectedItem = (function () {
            function SelectedItem(id, type) {
                this.type = type;
                this.id = id;
            }
            return SelectedItem;
        }());
        Maps.SelectedItem = SelectedItem;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=SelectedItem.js.map
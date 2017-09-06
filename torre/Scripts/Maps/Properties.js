var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        var Properties = (function () {
            function Properties(map) {
                var _this = this;
                this.map = map;
                this.map.selectedItem.subscribe(function (item) { return _this.onItemSelected(item); });
                this.name = ko.observable("");
                this.content = ko.observable("");
                this.id = ko.observable("");
                var root = document.getElementById("properties");
                ko.applyBindings(this, root);
            }
            Properties.prototype.saveProperties = function () {
                var _this = this;
                var model = JSON.stringify({
                    id: this.id(),
                    name: this.name(),
                    content: this.content()
                });
                $.ajax({
                    url: "/api/marker/update",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: model,
                    success: function (marker) {
                        var content = "<h4>" + marker.Name + "</h4>";
                        if (marker.Content) {
                            content += marker.Content;
                        }
                        _this.map.addMarker(marker.Id, marker.Latitude, marker.Longitude, content);
                        _this.map.select(marker.Id, content);
                    }
                });
            };
            Properties.prototype.onItemSelected = function (item) {
                if (item.type.id === Maps.MapItemType.marker.id) {
                    this.showMarkerProperties(item.id);
                }
            };
            Properties.prototype.showMarkerProperties = function (id) {
                var _this = this;
                $.ajax({
                    url: "/api/marker/edit",
                    type: "GET",
                    data: {
                        id: id
                    },
                    success: function (marker) {
                        _this.id(marker.Id);
                        _this.content(marker.Content);
                        _this.name(marker.Name);
                    }
                });
            };
            return Properties;
        }());
        Maps.Properties = Properties;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Properties.js.map
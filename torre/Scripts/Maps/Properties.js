var torre;
(function (torre) {
    var Maps;
    (function (Maps) {
        class Properties {
            constructor(map) {
                this.map = map;
                this.map.selectedItem.subscribe(item => this.onItemSelected(item));
                this.name = ko.observable("");
                this.content = ko.observable("");
                this.id = ko.observable("");
                let root = document.getElementById("properties");
                ko.applyBindings(this, root);
            }
            saveProperties() {
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
                    success: (marker) => {
                        var content = `<h4>${marker.Name}</h4>`;
                        if (marker.Content) {
                            content += marker.Content;
                        }
                        this.map.addMarker(marker.Id, marker.Latitude, marker.Longitude, content);
                        this.map.select(marker.Id, content);
                    }
                });
            }
            onItemSelected(item) {
                if (!item) {
                    this.clear();
                    return;
                }
                if (item.type.id === Maps.MapItemType.marker.id) {
                    this.showMarkerProperties(item.id);
                }
            }
            clear() {
                this.id(null);
                this.name("");
                this.content("");
            }
            showMarkerProperties(id) {
                $.ajax({
                    url: "/api/marker/edit",
                    type: "GET",
                    data: {
                        id: id
                    },
                    success: (marker) => {
                        this.id(marker.Id);
                        this.content(marker.Content);
                        this.name(marker.Name);
                    }
                });
            }
        }
        Maps.Properties = Properties;
    })(Maps = torre.Maps || (torre.Maps = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Properties.js.map
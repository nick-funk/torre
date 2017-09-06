module torre.Maps {
    import MarkerModel = T4TS.MarkerModel;
    import MarkerEditModel = T4TS.MarkerEditModel;

    export class Properties {
        private map: Maps.Map;

        public name: KnockoutObservable<string>;
        public content: KnockoutObservable<string>;
        public id: KnockoutObservable<string>;

        constructor(map: Map) {
            this.map = map;

            this.map.selectedItem.subscribe(item => this.onItemSelected(item));

            this.name = ko.observable("");
            this.content = ko.observable("");
            this.id = ko.observable("");

            let root = document.getElementById("properties");
            ko.applyBindings(this, root);
        }

        public saveProperties(): void {

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
                success: (marker: MarkerModel) => {
                    var content = `<h4>${marker.Name}</h4>`;

                    if (marker.Content) {
                        content += marker.Content;
                    }

                    this.map.addMarker(marker.Id, marker.Latitude, marker.Longitude, content);
                    this.map.select(marker.Id, content);
                }
            });
        }

        private onItemSelected(item: SelectedItem): void {
            if (!item) {
                this.clear();
                return;
            }

            if (item.type.id === MapItemType.marker.id) {
                this.showMarkerProperties(item.id);
            }
        }

        private clear(): void {
            this.id(null);
            this.name("");
            this.content("");
        }

        private showMarkerProperties(id: string): void {
            $.ajax({
                url: "/api/marker/edit",
                type: "GET",
                data: {
                    id: id
                },
                success: (marker: MarkerEditModel) => {
                    this.id(marker.Id);
                    this.content(marker.Content);
                    this.name(marker.Name);
                }
            });
        }
    }
}
namespace torre.Maps {
    import Uuid = Utilities.Uuid;
    import MarkerModel = T4TS.MarkerModel;

    export class Editor {
        private map: Map;
        private mode: string;

        public propertiesName: KnockoutObservable<string>;
        public selectedId: KnockoutObservable<string>;

        constructor(map: Map) {
            this.map = map;

            this.setupMapClickEvents();

            this.map.selectedItem.subscribe(item => this.onItemSelected(item));

            this.propertiesName = ko.observable("");
            this.selectedId = ko.observable("");

            let root = document.getElementById("editor");
            ko.applyBindings(this, root);
        }

        public setMode(mode: string): void {
            this.mode = mode;
            this.map.setCursor("crosshair");
        }

        public saveProperties(): void {
            $.ajax({
                url: "/api/marker/update",
                type: "POST",
                data: {
                    id: this.selectedId(),
                    name: this.propertiesName()
                },
                success: () => {
                    this.reloadMarker(this.selectedId());
                }
            });
        }

        private setupMapClickEvents() {
            var editor = this;
            this.map.addEvent('click', (args: any) => editor.onClick(args));
            this.map.addEvent('rightclick', (args: any) => editor.onRightClick(args));
        }

        private onClick(args: any): void {
            var latitude = args.latLng.lat();
            var longitude = args.latLng.lng();

            if (this.mode === "marker") {
                this.addMarker(longitude, latitude);
            }
            if (this.mode === "remove-marker") {
                this.removeMarker(longitude, latitude);
            }
        }

        private onRightClick(args: any): void {
            this.mode = "";
            this.map.setCursor(null);
        }

        private onItemSelected(item: SelectedItem): void {
            if (item.type.id === MapItemType.marker.id) {
                this.showMarkerProperties(item.id);
            }
        }

        private showMarkerProperties(id: string): void {
            $.ajax({
                url: "/api/marker/get",
                type: "GET",
                data: {
                    id: id
                },
                success: (marker: MarkerModel) => {
                    this.selectedId(marker.Id);
                    this.propertiesName(marker.Name);
                }
            });
        }

        private addMarker(longitude: number, latitude: number): void {
            var id = Uuid.create();
            var name = "Unknown";

            $.ajax({
                url: "/api/marker/add",
                type: "POST",
                data: {
                    id: id,
                    name: name,
                    latitude: latitude,
                    longitude: longitude
                },
                success: () => {
                    var content = `<h4>${name}</h4>`;

                    this.map.addMarker(id, latitude, longitude, content);
                    this.propertiesName(name);
                    this.selectedId(id);
                }
            });
        }

        private removeMarker(longitude: number, latitude: number): void {
            this.map.removeMarkersNear(latitude, longitude);
        }

        private reloadMarker(id: string) {
            $.ajax({
                url: "/api/marker/get",
                type: "GET",
                data: {
                    id: id
                },
                success: (marker: MarkerModel) => {
                    var content = `<h4>${marker.Name}</h4>`;

                    this.map.addMarker(id, marker.Latitude, marker.Longitude, content);
                    this.map.select(marker.Id, content);
                }
            });
        }
    }
}
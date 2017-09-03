namespace torre.Maps {
    import Uuid = Utilities.Uuid;

    export class Editor {
        private map: Map;
        private mode: string;

        constructor(map: Map) {
            this.map = map;

            this.setupMapClickEvents();

            let root = document.getElementById("editor");
            ko.applyBindings(this, root);
        }

        public setMode(mode: string): void {
            this.mode = mode;
            this.map.setCursor("crosshair");
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
                }
            });
        }

        private removeMarker(longitude: number, latitude: number): void {
            this.map.removeMarkersNear(latitude, longitude);
        }
    }
}
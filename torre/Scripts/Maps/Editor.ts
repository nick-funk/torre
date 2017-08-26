namespace torre.Maps {
    export class Editor {
        private map: Map;
        private mode: string;
        private markers: Marker[];

        constructor(map: Map) {
            this.map = map;

            this.markers = new Array<Marker>();

            var editor = this;
            this.map.addEvent('click', (args: any) => editor.onClick(args));
            this.map.addEvent('rightclick', (args: any) => editor.onRightClick(args));

            let root = document.getElementById("editor");
            ko.applyBindings(this, root);
        }

        public setMode(mode: string): void {
            this.mode = mode;
            this.map.setCursor("crosshair");
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

            var id = this.map.addMarker(latitude, longitude, "TEST");
            this.markers.push(new Marker(id, latitude, longitude));
        }

        removeMarker(longitude: number, latitude: number): void {
            for (var i = 0; i < this.markers.length; i++) {
                var marker = this.markers[i];

                var radius = this.map.getLongWidth() / 100;

                if (marker.isNear(latitude, longitude, radius)) {
                    this.map.removeMarker(marker.id);
                    this.markers.splice(i, 1);
                    i--;
                }
            }
        }
    }
}
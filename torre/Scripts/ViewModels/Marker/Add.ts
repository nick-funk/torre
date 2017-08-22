namespace torre.ViewModels.Marker {
    import Map = Maps.Map;

    export class Add {
        private map: Map;

        private markerId;

        constructor() {
            let latDiv = $("#Latitude");
            let longDiv = $("#Longitude");

            latDiv.on("change", () => this.updateCenter());
            longDiv.on("change", () => this.updateCenter());

            this.map = new Maps.Map(0, 0, 15, "map");

            this.updateCenter();
        }

        private updateCenter() {

            if (this.markerId) {
                this.map.removeMarker(this.markerId);
            }

            let latDiv = $("#Latitude");
            let longDiv = $("#Longitude");
            let latitude = parseFloat(latDiv.val());
            let longitude = parseFloat(longDiv.val());

            this.map.center(latitude, longitude);

            this.markerId = this.map.addMarker(latitude, longitude, "");
        }
    }
}
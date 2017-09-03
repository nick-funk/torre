namespace torre.ViewModels.Marker {
    import Map = Maps.Map;
    import Uuid = Utilities.Uuid;

    export class Add {
        private map: Map;

        private markerId;

        constructor() {
            let latDiv = $("#Latitude");
            let longDiv = $("#Longitude");

            latDiv.on("change", () => this.updateCenter());
            longDiv.on("change", () => this.updateCenter());

            this.map = new Maps.Map(0, 0, 15, "map");

            this.markerId = Uuid.create();
            this.updateCenter();
        }

        private updateCenter() {
            let latDiv = $("#Latitude");
            let longDiv = $("#Longitude");
            let latitude = parseFloat(latDiv.val());
            let longitude = parseFloat(longDiv.val());

            this.map.center(latitude, longitude);

            this.map.addMarker(this.markerId, latitude, longitude, "");
        }
    }
}
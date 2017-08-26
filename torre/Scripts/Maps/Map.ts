namespace torre.Maps {
    import Uuid = Utilities.Uuid;

    export class Map {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;

        private markers: {};

        constructor(centerLat: number, centerLong: number, zoom: number, targetDiv: string) {
            this.markers = {};

            this.loadMap(centerLat, centerLong, zoom, targetDiv);
        }

        private loadMap(centerLat: number, centerLong: number, zoom: number, targetDiv: string): void {
            var centerTo = { lat: centerLat, lng: centerLong };
            this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });

            this.infoWindow = new google.maps.InfoWindow();
        }

        public addMarker(latitude: number, longitude: number, content: string): string {

            var id = Uuid.create();

            var marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: this.map
            });

            var listener = google.maps.event.addListener(marker, 'click', ((marker, content, infoWindow) =>
                () => {
                    infoWindow.close();
                    infoWindow.setContent(content);
                    infoWindow.open(this.map, marker);
                })(marker, content, this.infoWindow));

            this.markers[id] = {
                marker: marker,
                clickEvent: listener
            };

            return id;
        }

        public removeMarker(id: string) {
            var details = this.markers[id];

            if (details) {
                var marker = details["marker"];
                var clickEvent = details["clickEvent"];

                google.maps.event.removeListener(clickEvent);
                marker.setMap(null);
            }
        }

        public center(latitude: number, longitude: number): void {
            this.map.setCenter(new google.maps.LatLng(latitude, longitude));
        }

        public addEvent(type: string, handler: (args: any) => void): void {
            this.map.addListener(type, handler);
        }

        public setCursor(name: string): void {
            this.map.setOptions({ draggableCursor: name });
        }

        public getLongWidth(): number {
            var bounds = this.map.getBounds();

            return bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
        }
    }
}
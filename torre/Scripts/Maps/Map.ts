namespace torre.Maps {
    export class Map {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;

        constructor(centerLat: number, centerLong: number, zoom: number, targetDiv: string) {
            this.loadMap(centerLat, centerLong, zoom, targetDiv);
        }

        private loadMap(centerLat: number, centerLong: number, zoom: number, targetDiv: string): void {
            var centerTo = { lat: centerLat, lng: centerLong };
            this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });

            this.infoWindow = new google.maps.InfoWindow();
        }

        public addMarker(latitude: number, longitude: number, content: string) {
            var marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: this.map
            });

            google.maps.event.addListener(marker, 'click', ((marker, content, infoWindow) =>
                () => {
                    infoWindow.close();
                    infoWindow.setContent(content);
                    infoWindow.open(this.map, marker);
                })(marker, content, this.infoWindow));
        }
    }
}
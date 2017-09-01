namespace torre.Maps {
    export class Map {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;
        private markers: Array<Marker>;
        private loaders: { (map: Map): void }[];

        public selectedItem: KnockoutObservable<SelectedItem>;

        constructor(centerLat: number, centerLong: number, zoom: number, targetDiv: string) {
            this.markers = [];
            this.loaders = [];
            this.selectedItem = ko.observable(null);

            this.loadMap(centerLat, centerLong, zoom, targetDiv);
        }

        private loadMap(centerLat: number, centerLong: number, zoom: number, targetDiv: string): void {
            var centerTo = { lat: centerLat, lng: centerLong };
            this.map = new google.maps.Map(document.getElementById(targetDiv), { zoom: zoom, center: centerTo });

            this.infoWindow = new google.maps.InfoWindow();
        }

        public addLoader(loader: { (map: Map): void }): void {
            this.loaders.push(loader);
        }

        public refresh(): void {
            for (var i = 0; i < this.loaders.length; i++) {
                this.loaders[i](this);
            }
        }

        public addMarker(id: string, latitude: number, longitude: number, content: string): string {
            if (this.markers[id]) {
                this.removeMarkerVisuals(id, this.markers[id]);
            }

            var marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: this.map
            });

            var listener = google.maps.event.addListener(marker, 'click', ((marker, infoContent) =>
                () => {
                    this.select(id, infoContent);
                })(marker, content));

            this.markers[id] = new Marker(id, latitude, longitude, listener, marker);

            return id;
        }

        public select(id: string, content: string): void {

            var mapMarker = this.markers[id].mapMarker;

            this.infoWindow.close();
            this.infoWindow.setContent(this.formatContent(id, content));
            this.infoWindow.open(this.map, mapMarker);
            this.selectedItem(new SelectedItem(id, MapItemType.marker));
        }

        public removeMarker(id: string) {
            var marker = this.markers[id];

            if (marker) {
                $.ajax({
                    url: "/api/marker/remove",
                    type: "POST",
                    data: {
                        id: marker.id
                    }
                });

                this.removeMarkerVisuals(id, marker);
            }
        }

        public removeMarkersNear(latitude: number, longitude: number) {
            for (var i in this.markers) {
                var marker = this.markers[i];

                var radius = this.getLongWidth() / 100;

                if (marker.isNear(latitude, longitude, radius)) {
                    this.removeMarker(marker.id);
                }
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

        private removeMarkerVisuals(id: string, marker: Marker): void {
            if (this.selectedItem().id === id) {
                this.infoWindow.close();
            }

            google.maps.event.removeListener(marker.clickEvent);
            marker.mapMarker.setMap(null);

            delete this.markers[id];
        }

        private formatContent(id: string, content: string): string {
            var html = `<div>${content}</div>`;

            html += `<div class="uk-text-center uk-grid-medium" uk-grid>
                        <div class="uk-width-1-3">
                            <a class="uk-button uk-button-small uk-button-primary" href="/marker/edit/${id}">Edit</a>
                        </div>
                        <div class="uk-width-1-3">
                            <button class="uk-button uk-button-small uk-button-danger" onclick="viewModel.map.removeMarker('${id}')">Delete</button>
                        </div>
                     </div>`;

            return html;
        }
    }
}
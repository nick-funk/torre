module torre.Maps {
    export class Marker {
        public longitude: number;
        public latitude: number;
        public id: string;
        public mapMarker: any;
        public clickEvent: any;

        constructor(id: string, latitude: number, longitude: number, clickEvent: any, mapMarker: any) {
            this.id = id;
            this.longitude = longitude;
            this.latitude = latitude;

            this.clickEvent = clickEvent;
            this.mapMarker = mapMarker;
        }

        public isNear(latitude: number, longitude: number, radius: number): boolean {
            return latitude >= this.latitude - radius * 2 &&
                latitude <= this.latitude + radius * 2 &&
                longitude >= this.longitude - radius &&
                longitude <= this.longitude + radius;
        }
    }
}
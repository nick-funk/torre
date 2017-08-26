module torre.Maps {
    export class Marker {
        public longitude: number;
        public latitude: number;
        public id: string;

        constructor(id: string, latitude: number, longitude: number) {
            this.longitude = longitude;
            this.latitude = latitude;
            this.id = id;
        }

        public isNear(latitude: number, longitude: number, radius: number): boolean {
            return latitude >= this.latitude - radius * 2 &&
                latitude <= this.latitude + radius * 2 &&
                longitude >= this.longitude - radius &&
                longitude <= this.longitude + radius;
        }
    }
}
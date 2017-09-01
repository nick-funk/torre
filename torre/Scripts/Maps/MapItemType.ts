module torre.Maps {
    export class MapItemType {
        public name: string;
        public id: number;

        public static marker = new MapItemType(0, "Marker");

        private constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
        }
    }
}
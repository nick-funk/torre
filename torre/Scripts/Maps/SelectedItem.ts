module torre.Maps {
    export class SelectedItem {
        public id: string;
        public type: MapItemType;

        public constructor(id: string, type: MapItemType) {
            this.type = type;
            this.id = id;
        }
    }
}
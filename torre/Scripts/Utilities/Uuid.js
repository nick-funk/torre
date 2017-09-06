var torre;
(function (torre) {
    var Utilities;
    (function (Utilities) {
        class Uuid {
            static create() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        }
        Utilities.Uuid = Uuid;
    })(Utilities = torre.Utilities || (torre.Utilities = {}));
})(torre || (torre = {}));
//# sourceMappingURL=Uuid.js.map
export var Camera;
(function (Camera) {
    /**
     * Camera type (not guaranteed to be correct, depending on the device).
     */
    let Type;
    (function (Type) {
        /**
         * Front facing camera.
         */
        Type["FRONT"] = "front";
        /**
         * Back facing camera.
         */
        Type["BACK"] = "back";
    })(Type = Camera.Type || (Camera.Type = {}));
})(Camera || (Camera = {}));
//# sourceMappingURL=camera.js.map
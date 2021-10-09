"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
var MorganMode;
(function (MorganMode) {
    MorganMode["DEV"] = "dev";
    MorganMode["COMMON"] = "common";
    MorganMode["TINY"] = "tiny";
    MorganMode["SHORT"] = "short";
    MorganMode["COMBINED"] = "combined";
})(MorganMode = exports.MorganMode || (exports.MorganMode = {}));
class Application {
    constructor(options) {
        this.container = new inversify_1.Container(options.containerOpts);
        console.clear();
        this.configureServices(this.container);
        this.setup(options);
    }
}
exports.Application = Application;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 4200;
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, morgan_1.default)("dev"));
    }
    routes() {
        this.app.use("/api/v1/life", (req, res) => {
            res.json({ ok: true, msg: "Hola mundo" });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
}
exports.Server = Server;

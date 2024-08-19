"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
/* ROUTE IMPORTS */
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const expense_route_1 = __importDefault(require("./routes/expense.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
/* MIDDLEWARE */
app.use(express_1.default.json()); // to support JSON-encoded bodies
app.use((0, cookie_parser_1.default)()); // allow us to parse incoming cookies
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.use("/dashboard", dashboard_route_1.default);
app.use("/products", product_route_1.default);
app.use("/users", user_route_1.default);
app.use("/expenses", expense_route_1.default);
app.use("/auth", auth_route_1.default);
/* SERVER */
const port = Number(process.env.PORT) || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

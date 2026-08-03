"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const buildApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};
const apiBaseUrl = buildApiBaseUrl();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl: apiBaseUrl });
});
app.get('/api/users', (_req, res) => {
    res.json({
        baseUrl: apiBaseUrl,
        users: [
            { id: 1, name: 'Ava', role: 'captain' },
            { id: 2, name: 'Noah', role: 'member' },
        ],
    });
});
app.get('/api/activities', (_req, res) => {
    res.json({
        baseUrl: apiBaseUrl,
        activities: [
            { id: 1, type: 'run', durationMinutes: 30, calories: 320 },
            { id: 2, type: 'strength', durationMinutes: 45, calories: 260 },
        ],
    });
});
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

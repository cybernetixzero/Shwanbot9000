"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ConfigService {
    configFilePath;
    token;
    clientId;
    guildId;
    isBonkEmojiCustom;
    bonkEmojiId;
    bonkEmojiName;
    bonkThreshold;
    sentenceLength;
    sentenceUnitOfTime;
    hornyJailRoleId;
    hornyJailRoleName;
    constructor() {
        this.configFilePath = path_1.default.resolve(__dirname, '../data/config.json');
        this.token = '';
        this.clientId = '';
        this.guildId = '';
        this.isBonkEmojiCustom = false;
        this.bonkEmojiId = '';
        this.bonkEmojiName = '';
        this.bonkThreshold = 0;
        this.sentenceLength = 0;
        this.sentenceUnitOfTime = 'Weeks';
        this.hornyJailRoleId = '';
        this.hornyJailRoleName = '';
    }
    load() {
        const data = fs_1.default.readFileSync(this.configFilePath);
        const json = JSON.parse(data.toString());
        Object.assign(this, json);
    }
    save() {
        const data = JSON.stringify(this, null, 4);
        fs_1.default.writeFileSync(this.configFilePath, data);
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config-service.js.map
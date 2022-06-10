import fs from 'fs';
import path from 'path';

export class ConfigService {
    filePath: string;
    token: string;
    clientId: string;
    guildId: string;
    isBonkEmojiCustom: boolean;
    bonkEmojiId: string;
    bonkEmojiName: string;
    bonkThreshold: number;
    sentenceLength: number;
    sentenceUnitOfTime: 'Days' | 'Weeks' | 'Months' | 'Years';
    hornyJailRoleId: string;
    hornyJailRoleName: string;

    constructor() {
        this.filePath = path.resolve(__dirname, '../data/config.json');
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
        const data = fs.readFileSync(this.filePath);
        const json = JSON.parse(data.toString());
        Object.assign(this, json);
    }

    save() {
        const data = JSON.stringify(this, null, 4);
        fs.writeFileSync(this.filePath, data);
    }
}

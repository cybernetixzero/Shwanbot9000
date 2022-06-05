const { Low, JSONFile } = require('lowdb-cjs');
//const { Low, JSONFile } = import('lowdb');
const { v4: uuidv4 } = require('uuid');

class DatabaseProvider {
    constructor() {
        this.adapter = null;
        this.db = null;
        this.load();
    }

    load = async () => {
        this.adapter = new JSONFile('./data/db.json');
        this.db = new Low(this.adapter);

        await this.db.read();

        if (this.db.data === null)
            await this.initialise();
    }

    initialise = async () => {
        this.db.data = {
            HJConsents: [],
            HJSentences: [],
            Emojis: []
        };

        await this.db.write();
    }

    setHJConsent = async (userId, isGiven) => {
        let hjConsent = this.db.data.HJConsents.find(x => x.userId == userId);

        let isNew = false;
        if (hjConsent === null) {
            isNew = true;

            hjConsent = {
                id: uuidv4()
            };
        }

        hjConsent.userId = userId;
        hjConsent.isGiven = isGiven;
        hjConsent.lastUpdatedAt = new Date().toUTCString();

        if (isNew)
            this.db.data.HJConsents.push(hjConsent);

        await this.db.write();
    }
}

module.exports = DatabaseProvider;

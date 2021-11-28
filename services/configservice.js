const fs = require('fs');

class ConfigService {
    constructor() {
        this.json = null;
        this.load();
    }

    load = () => {
        const data = fs.readFileSync('./data/config.json');
        this.json = JSON.parse(data);
    }

    save = () => {
        const data = JSON.stringify(this.json, null, 4);
        fs.writeFileSync('./data/config.json', data);
    }
}

module.exports = ConfigService;

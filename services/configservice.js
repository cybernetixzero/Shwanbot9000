const fs = require('fs');

class ConfigService {
    constructor() {
        this.load();
    }

    load = () => {
        const data = fs.readFileSync('./data/config.json');
        const json = JSON.parse(data);
        for (let key in json)
            this[key] = json[key];
    }

    save = () => {
        const data = JSON.stringify(this, null, 4);
        fs.writeFileSync('./data/config.json', data);
    }
}

module.exports = ConfigService;

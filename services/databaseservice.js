const { Sequelize, Op } = require('sequelize');

class DatabaseService {
    constructor() {
        this.database = new Sequelize({
            dialect: 'sqlite',
            storage: './data/shwanbot9000.sqlite',
            logging: false
        });
    }

    bindTables = async () => {
        this.sentences = this.database.define('sentences', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            bonks: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            commencesAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            expiresAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            days: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        });

        await this.sentences.sync();
    }

    getCurrentSentence = async (userId) => {
        const date = Date.now();

        const sentence = await this.sentences.findOne({
            where: {
                [Op.and]: [
                    { userId: { [Op.eq]: userId } },
                    { commencesAt: { [Op.lte]: date } },
                    { expiresAt: { [Op.gte]: date } }
                ]
            }
        });

        return sentence;
    }

    getCurrentSentences = async () => {
        const date = Date.now();

        const sentences = await this.sentences.findAll({
            where: {
                [Op.and]: [
                    { commencesAt: { [Op.lte]: date } },
                    { expiresAt: { [Op.gte]: date } }
                ]
            }
        });

        return sentences;
    }

    getActiveSentences = async () => {
        const sentences = await this.sentences.findAll({
            where: {
                [Op.and]: [
                    { isActive: { [Op.eq]: true } }
                ]
            }
        });

        return sentences;
    }

    createSentenceFromEntity = async (sentence) => {
        return await this.createSentence(sentence.userId, sentence.userName, sentence.bonks, sentence.commencesAt, sentence.expiresAt, sentence.days, sentence.isActive);
    }

    createSentence = async (userId, userName, bonks, commencesAt, expiresAt, days, isActive) => {
        const sentence = await this.sentences.create({
            userId: userId,
            userName: userName,
            bonks: bonks,
            commencesAt: commencesAt,
            expiresAt: expiresAt,
            days: days,
            isActive: isActive
        });

        return sentence;
    }

    updateSentenceFromEntity = async (sentence) => {
        return await this.updateSentence(sentence.id, sentence.bonks, sentence.commencesAt, sentence.expiresAt, sentence.days, sentence.isActive);
    }

    updateSentence = async (id, bonks, commencesAt, expiresAt, days, isActive) => {
        const affectedRows = await this.sentences.update({
            bonks: bonks,
            commencesAt: commencesAt,
            expiresAt: expiresAt,
            days: days,
            isActive: isActive
        }, {
            where: {
                [Op.and]: [
                    { id: { [Op.eq]: id } }
                ]
            }
        });

        return affectedRows;
    }
}

module.exports = DatabaseService;

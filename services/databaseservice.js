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

    createSentenceFromEntity = async (sentence) => {
        return await this.createSentence(sentence.userId, sentence.userName, sentence.bonks, sentence.commencesAt, sentence.expiresAt, sentence.isActive);
    }

    createSentence = async (userId, userName, bonks, commencesAt, expiresAt, isActive) => {
        const sentence = await this.sentences.create({
            userId: userId,
            userName: userName,
            bonks: bonks,
            commencesAt: commencesAt,
            expiresAt: expiresAt,
            isActive: isActive
        });

        return sentence;
    }

    updateSentenceFromEntity = async (sentence) => {
        return await this.updateSentence(sentence.id, sentence.bonks, sentence.commencesAt, sentence.expiresAt, sentence.isActive);
    }

    updateSentence = async (id, bonks, commencesAt, expiresAt, isActive) => {
        const affectedRows = await this.sentences.update({
            bonks: bonks,
            commencesAt: commencesAt,
            expiresAt: expiresAt,
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

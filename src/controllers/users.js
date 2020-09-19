const uuidv4 = require('uuid/v4');
const { users } = require('../data/database');
const database = require('../data/database')

module.exports = app => {

    const controller = {};

    controller.listUsers = async (req, res) => {
        let users = await database.users.find()
        res.status(200).json(users);
    }

    controller.saveUser = async (req, res) => {

        let user = new database.users;

        user._id = await uuidv4();
        user.name = req.body.name;
        user.birthDate = req.body.birthDate;
        user.cellphone = req.body.cellphone;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.occupation = req.body.occupation;
        user.state = req.body.state;

        await users.save()

        res.status(201).json(users);
    }

    controller.removeUser = async (req, res) => {

        const { customerId } = req.params;
        try {
            await database.users.findByIdAndDelete(customerId)
            res.status(200).json({
                message: 'Usuário encontrado e deletado com sucesso!',
                success: true,
                users: await database.users.find()
            });
        } catch (error) {
            res.status(404).json({
                message: 'Usuário não encontrado na base de dados.',
                success: false,
                users: await database.users.find()
            });    
        }
    }

    controller.updateUser = async (req, res) => {
        
        const { customerId } = req.params;
        let user = await database.users.findById(customerId)
        
        if (user) {

            user.name = req.body.name;
            user.birthDate = req.body.birthDate;
            user.cellphone = req.body.cellphone;
            user.phone = req.body.phone;
            user.email = req.body.email;
            user.occupation = req.body.occupation;
            user.state = req.body.state;

            await user.save() 
            
            res.status(200).json({
                message: 'Usuário encontrado e atualizado com sucesso!',
                success: true,
                users: await database.users.find()
            });
        }
        else {
            res.status(404).json({
                message: 'Usuário não encontrado na base de dados.',
                success: false,
                users: await database.users.find()
            });
        }
    }
    return controller;
}
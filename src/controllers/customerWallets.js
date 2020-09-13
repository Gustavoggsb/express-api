const uuidv4 = require('uuid/v4');
const database = require('../data/database')

module.exports = app => {

    const controller = {};

    controller.listCustomerWallets = async (req, res) => {
        let customerWallets = await database.customerWallets.find()
        res.status(200).json(customerWallets);
    }

    controller.saveCustomerWallets = async (req, res) => {

        let customerWallets = new database.customerWallets;

        customerWallets._id = await uuidv4();
        customerWallets.name = req.body.name;
        customerWallets.birthDate = req.body.birthDate;
        customerWallets.cellphone = req.body.cellphone;
        customerWallets.phone = req.body.phone;
        customerWallets.email = req.body.email;
        customerWallets.occupation = req.body.occupation;
        customerWallets.state = req.body.state;

        await customerWallets.save()

        res.status(201).json(customerWallets);
    }

    controller.removeCustomerWallets = async (req, res) => {

        const { customerId } = req.params;
        try {
            await database.customerWallets.findByIdAndDelete(customerId)
            res.status(200).json({
                message: 'Cliente encontrado e deletado com sucesso!',
                success: true,
                customerWallets: await database.customerWallets.find()
            });
        } catch (error) {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: await database.customerWallets.find()
            });    
        }
    }

    controller.updateCustomerWallets = async (req, res) => {
        
        const { customerId } = req.params;
        let customerWallet = await database.customerWallets.findById(customerId)
        
        if (customerWallet) {

            customerWallet.name = req.body.name;
            customerWallet.birthDate = req.body.birthDate;
            customerWallet.cellphone = req.body.cellphone;
            customerWallet.phone = req.body.phone;
            customerWallet.email = req.body.email;
            customerWallet.occupation = req.body.occupation;
            customerWallet.state = req.body.state;

            await customerWallet.save() 
            
            res.status(200).json({
                message: 'Cliente encontrado e atualizado com sucesso!',
                success: true,
                customerWallets: await database.customerWallets.find()
            });
        }
        else {
            res.status(404).json({
                message: 'Cliente não encontrado na base.',
                success: false,
                customerWallets: await database.customerWallets.find()
            });
        }
    }
    return controller;
}
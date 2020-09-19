module.exports = app => {
    const controller = app.controllers.users;

    app.route('/api/v1/users')
        .get(controller.listUsers)
        .post(controller.saveUser)
    
    app.route('/api/v1/users/:Id')
        .delete(controller.removeUser)
        .put(controller.updateUser)
}
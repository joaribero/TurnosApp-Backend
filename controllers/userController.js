const Roles = require('../models/roles');
const User = require('../models/user');

const ctrl = {};

ctrl.createRole = async (req, res) => {
    
    if(!req.user) {
        res.send({msg:'Acceso denegado', category:'error'});
    } else if (req.user.roleId === 1) {
        
        const count = (await Roles.find()).length;

        console.log(req.body);

        let role = new Roles;
        role.Id = count + 1;
        role.Name = req.body.name;
        role.Description = req.body.description

        await role.save();
        res.send({msg: 'Rol creado', category: 'success'});
    } else {
        res.send({msg: 'No posees los permisos necesarios para realizar esta acción.', category: 'error'});
    }

    
}

ctrl.users = async (req, res) => {
    const users = await User.find();

    res.send(users);
};

module.exports = ctrl;
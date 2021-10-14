const Roles = require('../models/roles');
const User = require('../models/user');
const State = require('../models/userState');

const isAdmin = async (id) => {
    const user = await User.findById(id);
    if (user) {
        if (user.roleId === 1) {
            return {admin: true, error: null, category: null}
        } else return {admin: false, error: 'No posees los permisos necesarios para realizar esta acción.', category: 'error'};
    }
    return {admin: false, error: 'Acceso denegado', category: 'error'}; 
}

const ctrl = {};

ctrl.createRole = async (req, res) => {
    
    //controlo que llegue un usuario en el rq
    if(req.user) {
        const {admin, error, category} = isAdmin(req.user.id);
        if (error) {
            res.send({error, category});
        } else {
            const count = (await Roles.find()).length;

            let role = new Roles;
            role.Id = count + 1;
            role.Name = req.body.name;
            role.Description = req.body.description

            await role.save();
            res.send({msg: 'Rol creado', category: 'success'});
        }  
    } else {
        res.send({error:'Acceso denegado', category:'error'});
    }    
}

ctrl.getRoles = async (req, res) => {
    const roles = await Roles.find();
    res.send(roles);
}

ctrl.createState = async (req, res) => {    
    
    //controlo que llegue un usuario en el rq
    if(req.user) {
        const {admin, error, category} = isAdmin(req.user.id);
        if (error) {
            res.send({error, category});
        } else {
            const count = (await State.find()).length;

            let state = new State;
            state.Id = count + 1;
            state.Name = req.body.name;
            state.Description = req.body.description

            await state.save();
            res.send({msg: 'Estado creado', category: 'success'});
        }  
    } else {
        res.send({error:'Acceso denegado', category:'error'});
    }   
}

ctrl.getUserStates = async (req, res) => {
    const states = await State.find();
    res.send(states);
}

ctrl.users = async (req, res) => {

    //controlo que llegue un usuario en el rq
    if(req.user) {
        const {admin, error, category} = isAdmin(req.user.id);
        if (error) {
            res.send({error, category});
        } else {
            const users = await User.find();
            res.send(users);
        }

    } else {
        res.send({error:'Acceso denegado', category:'error'});
    } 
    
};

ctrl.setRoleAndState = async (req, res) => {
    //controlo que llegue un usuario en el rq
    if(req.user) {
        const {admin, error, category} = isAdmin(req.user.id);
        if (error) {
            res.send({error, category});
        } else {
            
            //TODO
        }

    } else {
        res.send({error:'Acceso denegado', category:'error'});
    } 
}

module.exports = ctrl;
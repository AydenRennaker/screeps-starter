const creepConfigs = {};

const creepLogic = {
    register(name, logic){
        creepConfigs[name] = logic;
    },
    get(name){
        return creepConfigs[name];
    },
    getAllKeys(){
        return _.keys(creepConfigs);
    }
};


module.exports = creepLogic;
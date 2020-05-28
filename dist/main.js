/* This header is placed at the beginning of the output file and defines the
	special `__require`, `__getFilename`, and `__getDirname` functions.
*/
(function() {
	/* __modules is an Array of functions; each function is a module added
		to the project */
var __modules = {},
	/* __modulesCache is an Array of cached modules, much like
		`require.cache`.  Once a module is executed, it is cached. */
	__modulesCache = {},
	/* __moduleIsCached - an Array of booleans, `true` if module is cached. */
	__moduleIsCached = {};
/* If the module with the specified `uid` is cached, return it;
	otherwise, execute and cache it first. */
function __require(uid, parentUid) {
	if(!__moduleIsCached[uid]) {
		// Populate the cache initially with an empty `exports` Object
		__modulesCache[uid] = {"exports": {}, "loaded": false};
		__moduleIsCached[uid] = true;
		if(uid === 0 && typeof require === "function") {
			require.main = __modulesCache[0];
		} else {
			__modulesCache[uid].parent = __modulesCache[parentUid];
		}
		/* Note: if this module requires itself, or if its depenedencies
			require it, they will only see an empty Object for now */
		// Now load the module
		__modules[uid].call(this, __modulesCache[uid], __modulesCache[uid].exports);
		__modulesCache[uid].loaded = true;
	}
	return __modulesCache[uid].exports;
}
/* This function is the replacement for all `__filename` references within a
	project file.  The idea is to return the correct `__filename` as if the
	file was not concatenated at all.  Therefore, we should return the
	filename relative to the output file's path.

	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getFilename(path) {
	return require("path").resolve(__dirname + "/" + path);
}
/* Same deal as __getFilename.
	`path` is the path relative to the output file's path at the time the
	project file was concatenated and added to the output file.
*/
function __getDirname(path) {
	return require("path").resolve(__dirname + "/" + path + "/../");
}
/********** End of header **********/
/********** Start module 0: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\main.js **********/
__modules[0] = function(module, exports) {
let creepLogic = __require(1,0);
let roomLogic = __require(2,0);
let prototypes = __require(3,0);


module.exports.loop = function () {
    Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);
    _.forEach(Game.myRooms, r => roomLogic.spawning(r));
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        let role = creep.memory.role;
        if (creepLogic[role]) {
            creepLogic[role].run(creep);
        }
    }
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
return module.exports;
}
/********** End of module 0: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\main.js **********/
/********** Start module 1: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\index.js **********/
__modules[1] = function(module, exports) {
let creepLogic = {
    harvester:     __require(4,1),
    upgrader:      __require(5,1),
}

module.exports = creepLogic;
return module.exports;
}
/********** End of module 1: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\index.js **********/
/********** Start module 2: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\room\index.js **********/
__modules[2] = function(module, exports) {
let roomLogic = {
    spawning:     __require(6,2),
}

module.exports = roomLogic;
return module.exports;
}
/********** End of module 2: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\room\index.js **********/
/********** Start module 3: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\prototypes\index.js **********/
__modules[3] = function(module, exports) {
let files = {
    creep: __require(7,3)
}
return module.exports;
}
/********** End of module 3: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\prototypes\index.js **********/
/********** Start module 4: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\harvester.js **********/
__modules[4] = function(module, exports) {
var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            creep.sayHello();
            
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    },
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 2) {
            return true;
        }
    },
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;
return module.exports;
}
/********** End of module 4: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\harvester.js **********/
/********** Start module 5: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\upgrader.js **********/
__modules[5] = function(module, exports) {
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    },
    spawn: function(room) {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
        console.log('Upgraders: ' + upgraders.length, room.name);

        if (upgraders.length < 2) {
            return true;
        }
    },
    spawnData: function(room) {
            let name = 'Upgrader' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'upgrader'};
        
            return {name, body, memory};
    }
};

module.exports = roleUpgrader;
return module.exports;
}
/********** End of module 5: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\creeps\upgrader.js **********/
/********** Start module 6: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\room\spawning.js **********/
__modules[6] = function(module, exports) {
let creepLogic = __require(1,6);
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {
    _.forEach(creepTypes, type => console.log(type));
    let creepTypeNeeded = _.find(creepTypes, function(type) {
        return creepLogic[type].spawn(room);
    });
    let creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room);
    console.log(room, JSON.stringify(creepSpawnData));

    if (creepSpawnData) {
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});
    
        console.log("Tried to Spawn:", creepTypeNeeded, result)
    }
}

module.exports = spawnCreeps;
return module.exports;
}
/********** End of module 6: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\room\spawning.js **********/
/********** Start module 7: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\prototypes\creep.js **********/
__modules[7] = function(module, exports) {
Creep.prototype.sayHello = function sayHello() {
    this.say("Hello", true);
}
return module.exports;
}
/********** End of module 7: C:\Users\Ayden Rennaker\Desktop\Starter Codebase\src\prototypes\creep.js **********/
/********** Footer **********/
if(typeof module === "object")
	module.exports = __require(0);
else
	return __require(0);
})();
/********** End of footer **********/

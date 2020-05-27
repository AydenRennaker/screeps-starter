# Andromeda

Collaborative project with pure JS and functional programming.

## Design Goals

Andromeda, like [Orion](https://gitlab.com/screeps-united-nations/orion), is intended to be an advanced AI for Screeps used by many different players.
To that end, its design must be:
1. **Dynamic:** Deals with any player situation, room layout, and memory state
2. **Automated:** Functions well without manual intervention
3. **Configurable:** Provides simple avenues for manual intervention and decision-making
4. **Understandable:** Exhibits a simple, well-organized, self-documenting structure

## Setup

### Install required software
* [Node.js](https://nodejs.org/en/) (v6.0.0+)

### Setup config file

```bash
$ cp Gruntfile.example.js Gruntfile.js
```

In Gruntfile.js introduce your username/password for screeps.

**WARNING:** Do **not** commit this file into the repository!

### Install npm modules

```bash
$ npm install
```

## Usage

* `grunt write`: Writes your distribution file to the remote
* `grunt merge`: Merges the source files into the dist
* `grunt`: Checks the jshint rules, merges your src files and writes the dist to the remote

## Updating

To update to the latest version of Andromeda:

1. `git checkout stable-X.Y`, replacing `X.Y` with the desired version
	* or `git checkout master` for the latest experimental version
2. `git pull`
3. Identify which migrations you need to run.  Usually you can do this by:
	* Running `Andromeda.version()` in Screeps
	* Finding the commit hash from the end of the version string (everything after "-g")
	* `git diff OLDVERSION..NEWVERSION src/migration/index.js`, where:
		* `OLDVERSION` is the commit hash you identified above, e.g. `abcd1234`
		* `NEWVERSION` is the version tag, branch, or commit you are updating to, e.g. `stable-X.Y`
	* Any green lines (additions) are migration scripts you should consider running
4. For each new migration script that you need to run:
	* Run `Andromeda.addMigration(ID)` in Screeps, where:
		* `ID` is the identifier / key of the migration
6. `grunt`

## Contributing

Andromeda is currently maintained by @creosteanu and @aleksis.kauppinen.
For details on architecture, code style, and how to contribute, see the [Contribution Guide](CONTRIBUTING.md).

## Architecture

For more information on the structure of the project check [Architecture Guide](ARCHITECTURE.md).

## Migrating

For more information on the common problems in migrating to Andromeda check [Migration Guide](MIGRATION.md).

## Flag use

For more information on how to use flags to direct Andromeda check [Flag Guide](FLAGS.md).

## Memory guide

For more information on how to configure settings in memory, check the [Memory Guide](MEMORY.md).

## Operation guide (incomplete)

For examples of operations see [Operation Wiki](https://gitlab.com/screeps-united-nations/andromeda/wikis/operation-examples).

For more information on how operations work and what to configure see [Operation guide](Operations.md)
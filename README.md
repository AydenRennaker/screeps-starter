## Setup

[![Explainer Video](https://img.youtube.com/vi/N7KMOG8C5vA/0.jpg)](https://www.youtube.com/watch?v=N7KMOG8C5vA)

### Install required software
* [Node.js](https://nodejs.org/en/) (v12.17.0+) LTS

### Setup config file

In Gruntfile.js introduce your username/password for screeps.

### Install npm modules

$ npm install
$ npm install -g grunt-cli

You may have to install grunt with the -g for Global which sets an enviorment path variable. Otherwise it may say something about grunt not being found.

## Usage

* `grunt main`: Writes your distribution file to the MMO Server
* `grunt sandbox`: Writes your distribution file to the atanner sandbox or another community server
* `grunt merge`: Merges the source files into the dist
* `grunt`: Checks the jshint rules, merges your src files and writes the dist to the remote


## Server Plug

[New Player Friendly Screeps Server](https://atannergaming.com/screeps/)

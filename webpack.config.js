const fs = require('fs');
const utils = require('./utils/utils');
const PageSlide = require('./PageSlide/src/PageSlide');
const Player = require('./Player/src/Player');

const config = {
    entry: {},
    output: {
        filename: '[name].min.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.js$/,
            use: ['babel-loader']
        }]
    }
};

function factory(obj, cfg){
    let code = [],
        name = obj.name,
        outils = obj.utils;
    for(let k in outils){
        if(utils.hasOwnProperty(k)){
            code.push(utils[k].toString());
        }
    }
    fs.writeFileSync('./'+name+'/factory/utils.js', 'export default {\n\t'+code.join(',\n\t')+'\n}');
    fs.writeFileSync('./'+name+'/factory/'+name+'.js', 'import utils from \'./utils\';\nwindow.'+name+'='+obj.fn.toString());
    cfg.entry[name] = __dirname+'/'+name+'/factory/'+name+'.js';
    cfg.output.path = __dirname + '/dist';
}

factory(PageSlide, config);
factory(Player, config);

module.exports = config;

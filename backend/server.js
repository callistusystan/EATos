
import EOS from 'eosjs'

var http = require('http').createServer()
var io = require('socket.io')(http);


const EOS_CONFIG = {
    contractName: 'food.ctr',
    contractSender: 'food.ctr',
    clientConfig: {
        keyProvider: [''],
        httpEndpoint: ''
    }
};

const eos = EOS(EOS_CONFIG.clientConfig);

var port = process.env.PORT || 3300;

io.on('connecton', function(client){
    client.on('register', handleRegister)
    client.on('viewFood', handleViewingFood)
    client.on('selectFood', handleSelectingFood)
});

function handleRegister(){
    eos.transaction(tr => {
        tr.newaccount({
            creator: 'eosio',
            name: accountName,
            owner: pubkey,
            active: pubkey,
        })
    })
}


http.listen(port, function(){
    console.log('listening on *:'+port);
});

 
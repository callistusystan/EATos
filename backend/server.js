var EOS = require('eosjs');
var http = require('http').createServer();
var io = require('socket.io')(http);

const wif = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
const pubkey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'

const EOS_CONFIG = {
    contractName: 'food.ctr',
    contractSender: 'food.ctr',
    clientConfig: {
        keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'],
        httpEndpoint: 'http://localhost:8888'
    }
};

const eos = EOS(EOS_CONFIG.clientConfig);
var port = process.env.PORT || 3300;

var SALES = [];

io.on('connection', function(client) {
    client.emit('getSales', sales);
});

io.on('getFoods', getFoods);
io.on('getSales', getSales);
io.on('createAcc', createAcc);
io.on('createSale', createSale);
io.on('processTransaction', processTransaction);

function getFoods(accountName) {
    eos.getTableRows({
        code: EOS_CONFIG.contractName,
        scope: accountName,
        table:'foods',
        json: true,
    }).then(({ rows }) => {
        io.emit('getFoods', rows);
    });
}

function getSales() {
    eos.getTableRows({
        code: EOS_CONFIG.contractName,
        scope: EOS_CONFIG.contractName,
        table:'sales',
        json: true,
    }).then(({ rows }) => {
        SALES = rows;
        io.emit('getSales', rows);
    });
}

function createAcc(accountName){
    eos.transaction(tr => {
        tr.newaccount({
            creator: 'eosio',
            name: accountName,
            owner: pubkey,
            active: pubkey,
        })

        tr.buyrambytes({
            payer: 'eosio',
            receiver: 'myaccount',
            bytes: 8192
        })
    
        tr.delegatebw({
            from: 'eosio',
            receiver: 'myaccount',
            stake_net_quantity: '10.0000 SYS',
            stake_cpu_quantity: '10.0000 SYS',
            transfer: 0
        })
    }).then(res => {    
        eos.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.createacc(
                EOS_CONFIG.contractSender,
                accountName,
                { authorization: [EOS_CONFIG.contractSender] }
            ).then(res => {
                io.emit('Create New Account', { done: true });
            })
        })
    });
}

function createSale({ seller, type_of_sale, qr_code, count, price, description }) {
    eos.contract(EOS_CONFIG.contractName).then((contract) => {
        contract.createsale(
            {
                seller, 
                sale_id: SALES.length+1, 
                type_of_sale, 
                qr_code, 
                count,
                price, 
                description
            },
            { authorization: [EOS_CONFIG.contractSender] }
        ).then(res => {
            io.emit('Create Sale', { done: true });
        });
    });
}

function processTransaction({ curOwner, newOwner, qr_code, count, type_of_sale, sale_id }) {
    eos.contract(EOS_CONFIG.contractName).then((contract) => {
        contract.setfoodowner(
            {
                curOwner,
                newOwner,
                qr_code,
                count,
                type_of_sale,
                sale_id
            },
            { authorization: [EOS_CONFIG.contractSender] }
        ).then(res => {
            io.emit('Create Sale', { done: true });
        })
    })
}

http.listen(port, function(){
    console.log('listening on *:'+port);
});
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
var NAME_TO_SOCKET = {};

getSales();

io.on('connection', client => {
    client.emit('getSales', SALES);

    client.on('createAcc', createAcc);
    client.on('getFoods', (args) => {
        getFoods(args)
            .then(({ rows }) => {
                client.emit('getFoods', rows);
            }).catch(err => console.log('getfooderr', err));
    });
    client.on('getSales', getSales);
    client.on('createSale', createSale);
    client.on('createFood', createFood);
    client.on('processTransaction', processTransaction);
});

function getFoods(accountName, callback) {
    return eos.getTableRows({
        code: EOS_CONFIG.contractName,
        scope: accountName || 'callistus',
        table:'foods',
        json: true,
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
        console.log('GOT SALES', SALES);
        io.emit('getSales', rows);
    });
}

function createAcc(accountName, callback) {
    console.log('createAcc', accountName);
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
                accountName,
                { authorization: [accountName] }
            ).then(res => {
                console.log('RES', res);
                
                callback(true);
            }).catch(err => {
                callback(false);
            });
        })
    }).catch(err => {
        callback(false);
    });
}

function createSale({ seller, type_of_sale, qr_code, count, price, description }) {
    eos.contract(EOS_CONFIG.contractName).then((contract) => {
        contract.createsale(
            {
                seller: seller || 'callistus', 
                sale_id: SALES.length+1, 
                type_of_sale, 
                qr_code, 
                count,
                price, 
                description
            },
            { authorization: [seller || 'callistus'] }
        ).then(res => {
            getSales();
        });
    });
}

function createFood({ curOwner, qr_code, food_name, expiry_date, location, image, count, units, price }) {
    console.log('CREATE FOOD')
    eos.contract(EOS_CONFIG.contractName).then((contract) => {
        console.log('CREATING FOOD');
        contract.createfood(
            {
                curOwner: curOwner || 'callistus', 
                qr_code, 
                food_name, 
                expiry_date, 
                location,
                image: '', 
                count,
                units,
                price
            },
            { authorization: [curOwner] }
        ).then(res => {
            getFoods(curOwner);
        });
    });
}

function processTransaction({ curOwner, newOwner, qr_code, count, type_of_sale, sale_id }) {
    eos.contract(EOS_CONFIG.contractName).then((contract) => {
        contract.setfoodowner(
            {
                curOwner: curOwner  || 'callistus',
                newOwner,
                qr_code,
                count,
                type_of_sale,
                sale_id
            },
            { authorization: [curOwner || 'callistus', newOwner || 'evelyn'] }
        ).then(res => {
            getSales();
            getFoods(curOwner);
            getFoods(newOwner);
        }).catch(res => {

        });
    })
}

http.listen(port, function(){
    console.log('listening on *:'+port);
});
/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/eosio.hpp>
#include <string>
#include <vector>
#include <algorithm>
#include <iterator>

using namespace eosio;
using std::string;
using std::stoll;
using std::copy;


class foodContract : public contract {
 public:
  foodContract(account_name self) : contract(self), sales(_self, _self), accounts(_self, _self) {}

  // @abi action
  void createacc(account_name curOwner) {
    require_auth(curOwner);
    // Check if curOwner has food

    auto itr = accounts.find(curOwner);
    eosio_assert(itr == accounts.end(), "Account already exists!");

    accounts.emplace(curOwner, [&](auto & acc) {
      acc.owner = curOwner;
      acc.no_of_sales = 0;
      acc.no_of_donates = 0;
      acc.amount = 1000;
    });
    
    print("Created Account: ", curOwner);
  }
  
  // @abi action
  void createfood(account_name curOwner, uint64_t qr_code, string food_name, string expiry_date, uint32_t count, string units, uint32_t price) {
    require_auth(curOwner);
    // Check if curOwner has food
    foodtable curOwnerFoods(_self, curOwner);

    curOwnerFoods.emplace(curOwner, [&](auto & food_record) {
      food_record.owner = curOwner;
      food_record.qr_code = qr_code;
      food_record.food_name = food_name;
      food_record.expiry_date = expiry_date;
      food_record.count = count;
      food_record.units = units;
      food_record.price = price;
    });
    
    print("Added Food to ", curOwner);
  }


  // @abi action
  void createsale(account_name seller, uint32_t sale_id, uint32_t type_of_sale, uint64_t qr_code, uint32_t count, uint32_t price, string description) {
    require_auth(seller);

    // Check if curOwner has food
    foodtable curOwnerFoods(_self, seller);
    auto itr = curOwnerFoods.find(qr_code);

    eosio_assert(itr != curOwnerFoods.end(), "Seller does not have this food"); 

    if (type_of_sale == 1) {
      eosio_assert(price < itr->price, "Sale price should be less than bought price!");
    } else if (type_of_sale == 2) {
      eosio_assert(price == 0, "Donations should be free!");
    }

    sales.emplace(seller, [&](auto & sale_item) {
      sale_item.sale_id = sale_id;
      sale_item.type_of_sale = type_of_sale;
      sale_item.seller = seller;
      sale_item.qr_code = qr_code;
      sale_item.prev_owners = itr->prev_owners;
      sale_item.food_name = itr->food_name;
      sale_item.expiry_date = itr->expiry_date;
      sale_item.count = count;
      sale_item.units = itr->units;
      sale_item.price = price;
      sale_item.description = description;
    });
    
    print("Created Sale #", sale_id);
  }


  // @abi action
  void setfoodowner(account_name curOwner, account_name newOwner, uint64_t qr_code, uint32_t count, uint32_t type_of_sale, uint32_t sale_id) {
    // type = 0 means normal sale
    // type = 1 means sell to peers
    // type = 2 means donate
    // type = 3 means wasted
    require_auth(curOwner);
    
    // Check if curOwner has food
    foodtable curOwnerFoods(_self, curOwner);
    auto curOwnerFoodRecord = curOwnerFoods.find(qr_code);
    eosio_assert(curOwnerFoodRecord != curOwnerFoods.end(), "Owner does not have this food");
    eosio_assert(curOwnerFoodRecord->count >= count, "Owner does not have enough of this food");

    foodtable newOwnerFoods(_self, newOwner);
    auto newOwnerFoodRecord = newOwnerFoods.find(qr_code);

    uint32_t price;
    string units;

    if (type_of_sale == 1) {
      auto newOwnerAccountRecord = accounts.find(newOwner);
      auto saleRecord = sales.find(sale_id);
      eosio_assert(newOwnerAccountRecord->amount >= saleRecord->price, "Buyer does not have enough tokens");
      price = saleRecord->price;
      units = saleRecord->units;
    } else if (type_of_sale == 2) {
      auto saleRecord = sales.find(sale_id);
      price = saleRecord->price;
      units = saleRecord->units;
    }

    // increase new owner counts
    if (newOwnerFoodRecord != newOwnerFoods.end()) {
      newOwnerFoods.modify(newOwnerFoodRecord, newOwner, [&](auto & food_record) {
        food_record.count += count;
      });
    } else {
      newOwnerFoods.emplace(newOwner, [&](auto & food_record) {
        food_record.owner = newOwner;
	food_record.prev_owners = curOwnerFoodRecord->prev_owners;
        food_record.prev_owners.push_back(curOwner);
        food_record.qr_code = curOwnerFoodRecord->qr_code;
        food_record.food_name = curOwnerFoodRecord->food_name;
        food_record.expiry_date = curOwnerFoodRecord->expiry_date;
        food_record.count = count;
        food_record.units = units;
        food_record.price = price;
      });
    }

    // decrease cur owner counts
    if (curOwnerFoodRecord->count == count) {
      curOwnerFoods.erase(curOwnerFoodRecord);
    } else {
      curOwnerFoods.modify(curOwnerFoodRecord, curOwner, [&](auto & food_record){
        food_record.count -= count;
      });
    }

    if (type_of_sale == 1) {
      auto curOwnerAccount = accounts.find(curOwner);
      accounts.modify(curOwnerAccount, curOwner, [&](auto & acc) {
        acc.no_of_sales++;
      });

      auto saleRecord = sales.find(sale_id);
      if (saleRecord->count == count) {
        sales.erase(saleRecord);
      } else {
        sales.modify(saleRecord, curOwner, [&](auto & sale_item) {
          sale_item.count -= count;
        });
      }
    } else if (type_of_sale == 2) {
      auto curOwnerAccount = accounts.find(curOwner);
      accounts.modify(curOwnerAccount, curOwner, [&](auto & acc) {
        acc.no_of_donates++;
      });

      auto saleRecord = sales.find(sale_id);
      if (saleRecord->count == count) {
        sales.erase(saleRecord);
      } else {
        sales.modify(saleRecord, curOwner, [&](auto & sale_item) {
          sale_item.count -= count;
        });
      }
    }

    print("Changed Food Owner from ", curOwner, " to ", newOwner);
  }

  private:
    // @abi table accounts i64
    struct account {
      account_name  owner;
      uint32_t      no_of_sales;
      uint32_t      no_of_donates;
      uint32_t      amount;

      auto primary_key() const { return owner; }
      EOSLIB_SERIALIZE(account, (owner)(no_of_sales)(no_of_donates)(amount))
    };

    typedef multi_index<N(accounts), account> accountstable;
    accountstable accounts;


    // @abi table foods i64
    struct food {
      account_name  owner;
      std::vector<account_name>  prev_owners;
      uint64_t      qr_code;
      string        food_name;
      string        expiry_date;
      uint32_t      count;
      string        units;
      uint64_t      price;

      auto primary_key() const { return qr_code; }
      EOSLIB_SERIALIZE(food, (owner)(prev_owners)(qr_code)(food_name)(expiry_date)(count)(units)(price))
    };

    typedef multi_index<N(foods), food> foodtable;



    // @abi table sales i64
    struct sale {
      uint32_t      sale_id;
      uint32_t      type_of_sale;
      account_name  seller;
      uint64_t      qr_code;
      std::vector<account_name> prev_owners;
      string        food_name;
      string        expiry_date;
      uint32_t      count;
      string        units;
      uint32_t      price;
      string        description;


      auto primary_key() const { return sale_id; }
      EOSLIB_SERIALIZE(sale, (sale_id)(type_of_sale)(seller)(qr_code)(prev_owners)(food_name)(expiry_date)(count)(units)(price)(description))
    };

    typedef multi_index<N(sales), sale> salestable;
    salestable sales;
};

EOSIO_ABI(foodContract, (createacc)(createfood)(createsale)(setfoodowner))

/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/eosio.hpp>
#include <string>
#include <vector>

using namespace eosio;
using std::string;
using std::stoll;


class foodContract : public contract {
 public:
  foodContract(account_name self) : contract(self), foods(_self, _self) {}

  // @abi action
  void createaccount(account_name curOwner) {
    require_auth(curOwner);
    // Check if curOwner has food
    auto itr = accounts.find(curOwner);
    eosio_assert(itr == accounts.end(), "Account already exists!");

    accounts.emplace(curOwner, [&](auto & acc) {
      acc.owner = curOwner;
      acc.no_of_sales = 0;
      acc.no_of_donates = 0;
    });
    
    print("Added Food to ", curOwner);
  }
  
  // @abi action
  void createfood(account_name curOwner, uint64_t qr_code, string food_name, string expiry_date, uint32_t count) {
    require_auth(curOwner);
    // Check if curOwner has food
    foodtable curOwnerFoods(_self, curOwner);

    foodtable.emplace(curOwner, [&](auto & food_record) {
      food_record.owner = curOwner;
      food_record.prev_owner.push_back(curOwner);
      food_record.qr_code = qr_code;
      food_record.food_name = food_name;
      food_record.expiry_date = expiry_date;
      food_record.count = count;
    });
    
    print("Added Food to ", curOwner);
  }

  // @abi action
  void setfoodowner(account_name curOwner, account_name newOwner, uint64_t qr_code, uint32_t count, uint32_t type_of_sale) {
    // type = 0 means normal sale
    // type = 1 means sell to peers
    // type = 2 means donate
    // type = 3 means wasted
    require_auth(curOwner);
    
    // Check if curOwner has food
    foodtable curOwnerFoods(_self, curOwner);
    auto itr = curOwnerFoods.find(qr_code);
    eosio_assert(itr == curOwnerFoods.end(), "Owner does not have this food");
    eosio_assert(itr->count >= count, "Owner does not have enough of this food");

    foodtable newOwnerFoods(_self, newOwner);
    auto itr2 = newOwnerFoods.find(qr_code);

    if (itr2 != newOwnerFoods.end()) {
      foodtable.modify(itr2, newOwner, [&](auto & food_record) {
        food_record.count += count;
      });
    } else {
      foodtable.emplace(newOwner, [&](auto & food_record) {
        food_record.owner = itr->newOwner;
        food_record.prev_owners = itr->prev_owners;
        food_record.prev_owners.push_back(curOwner);
        food_record.qr_code = itr->qr_code;
        food_record.food_name = itr->food_name;
        food_record.expiry_date = itr->expiry_date;
        food_record.count = count;
      });
    }

    if (type_of_sale == 1) {
      auto itr = accounts.find(curOwner);
      accounts.modify(itr, curOwner, [&](auto & acc) {
        acc.no_of_sales++;
      });
    } else if (type_of_sale == 2) {
      auto itr = accounts.find(curOwner);
      accounts.modify(itr, curOwner, [&](auto & acc) {
        acc.no_of_donates++;
      });
    }

    curOwnerFoods.erase(itr);

    print("Changed Food Owner from ", curOwner, " to ", newOwner);
  }

  private:
    // @abi table accounts i64
    struct account {
      account_name  owner;
      uint32_t      no_of_sales;
      uint32_t      no_of_donates;

      auto primary_key() const { return owner; }
      EOSLIB_SERIALIZE(account, (owner)(no_of_sales)(no_of_donates))
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

      auto primary_key() const { return qr_code; }
      EOSLIB_SERIALIZE(food, (owner)(prev_owner)(qr_code)(food_name)(expiry_date)(count))
    };

    typedef multi_index<N(foods), food> foodtable;
    foodtable foods;



    // @abi table sales i64
    struct sale {
      account_name  owner;
      uint64_t      qr_code;
      string        food_name;
      string        expiry_date;
      uint32_t      count;

      auto primary_key() const { return qr_code; }
      EOSLIB_SERIALIZE(food, (owner)(prev_owner)(qr_code)(food_name)(expiry_date)(count))
    };

    typedef multi_index<N(sales), food> salestable;
    salestable sales;

    
    // @abi table analytics i64
    struct data {
      string qr_code;

      auto primary_key() const { return owner; }
      EOSLIB_SERIALIZE(account, (owner)(no_of_donates))
    };

    typedef multi_index<N(accounts), account> accountstable;
    analytics accounts;
};

EOSIO_ABI(foodContract, (createfood)(setfoodowner)(subvote))

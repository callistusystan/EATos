/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <eosiolib/eosio.hpp>
#include <string>

using namespace eosio;
using std::string;

class foodContract : public contract {
 public:
  foodContract(account_name self) : contract(self), foods(_self, _self) {}

  // @abi action
  void setfoodowner(account_name curOwner, account_name newOwner, string qr_code, uint32_t count) {
   // Check if curOwner has food
   foodtable curOwnerFoods(_self, curOwner);
   auto itr = accounts.find(qr_code);
   eosio_assert(itr == accounts.end(), "Owner does not have this food");
   eosio_assert(itr->count >= count, "Owner does not have enough of this food");


   foods.modify(votee, itr, [&](auto & food_record) {
     
   });

    accounts.emplace(newOwner, [&](auto & food_record) {
      food_record.owner = itr->newOwner;
      food_record.prev_owner = itr->curOwner;
      food_record.qr_code = itr->qr_code;
      food_record.food_name = itr->food_name;
      food_record.expiry_date = itr->expiry_date;
      food_record.count = itr->count;

    });

    print("Added a new Votee: ", votee);
  }
  }

  // inline asset get_supply(symbol_name sym) const;

  // inline asset get_balance(account_name owner, symbol_name sym) const;

 private:
  // @abi table foods i64
  struct food {
    account_name  owner;
    account_name  prev_owner;
    string        qr_code;
    string        food_name;
    string        expiry_date;
    uint32_t      count;

    auto primary_key() const { return qr_code; }
    EOSLIB_SERIALIZE(food, (owner)(prev_owner)(qr_code)(food_name)(expiry_date)(count))
  };

  typedef multi_index<N(foods), food> foodtable;
  foodtable foods;
};

EOSIO_ABI(foodContract, (addvotee)(addvote)(subvote))

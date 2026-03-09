import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type MenuItem = {
    name : Text;
    category : Text;
    description : Text;
    price : Nat;
  };

  module MenuItem {
    public func compare(item1 : MenuItem, item2 : MenuItem) : Order.Order {
      Text.compare(item1.name, item2.name);
    };
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
  };

  module Inquiry {
    public func compare(inquiry1 : Inquiry, inquiry2 : Inquiry) : Order.Order {
      Text.compare(inquiry1.name, inquiry2.name);
    };
  };

  let menuItems = Map.empty<Text, MenuItem>();
  var inquiries : [Inquiry] = [];

  func isEmailValid(email : Text) : Bool {
    email.contains(#char '@') and email.contains(#char '.');
  };

  func isPriceValid(price : Nat) : Bool {
    price >= 0 and price <= 100_000_000;
  };

  func isNameValid(name : Text) : Bool {
    name.size() <= 30;
  };

  func isCategoryValid(category : Text) : Bool {
    category.size() <= 30;
  };

  public shared ({ caller }) func addMenuItem(name : Text, category : Text, description : Text, price : Nat) : async () {
    if (name == "" or category == "" or description == "") {
      Runtime.trap("Name, category, and description must not be empty");
    };
    if (description.size() > 500) {
      Runtime.trap("Description must not exceed 500 characters, provided: " # description.size().toText());
    };
    if (not isPriceValid(price)) {
      Runtime.trap("Price must be a positive number in cents (up to €1,000.000)");
    };
    if (not isNameValid(name)) {
      Runtime.trap("Menu item name must not exceed 30 characters, provided: '" # name # "'");
    };
    if (not isCategoryValid(category)) {
      Runtime.trap("Menu item category must not exceed 30 characters, provided: '" # category # "'");
    };

    let menuItem : MenuItem = {
      name;
      category;
      description;
      price;
    };
    menuItems.add(name, menuItem);
  };

  public query ({ caller }) func getMenuItem(name : Text) : async MenuItem {
    switch (menuItems.get(name)) {
      case (null) {
        Runtime.trap("Menu item with name " # name # " does not exist");
      };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItems.values().toArray().filter(
      func(item) { item.category == category }
    );
  };

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    if (not isEmailValid(email)) {
      Runtime.trap("Invalid email address: " # email);
    };
    if (name.size() > 80) {
      Runtime.trap("Name must not exceed 80 characters, provided: " # name.size().toText());
    };
    if (message.size() > 500) {
      Runtime.trap("Message must not exceed 500 characters, provided: " # message.size().toText());
    };

    let inquiry : Inquiry = {
      name;
      email;
      message;
    };
    inquiries := inquiries.concat([inquiry]);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.sort();
  };
};

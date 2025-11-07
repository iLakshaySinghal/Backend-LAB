const User = require("../model/User");

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findAll() {
    return await User.find().select("-password");
  }
}

module.exports = new UserRepository();

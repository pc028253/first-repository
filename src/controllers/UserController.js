const User = require('../models/UserModel');

class UserController {
  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error('創建用戶失敗：' + error.message);
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('用戶不存在');
      }
      return user;
    } catch (error) {
      throw new Error('獲取用戶失敗：' + error.message);
    }
  }

  async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!user) {
        throw new Error('用戶不存在');
      }
      return user;
    } catch (error) {
      throw new Error('更新用戶失敗：' + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('用戶不存在');
      }
      return { message: '用戶已成功刪除' };
    } catch (error) {
      throw new Error('刪除用戶失敗：' + error.message);
    }
  }
}

module.exports = new UserController();
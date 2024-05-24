import User from "../models/user.models.js"

const userController = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  editProfile: async (req, res) => {
    const { name, bio, phone, email, password } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;

    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phone = phone || user.phone;
      user.email = email || user.email;
      user.profileImage = profileImage || user.profileImage;

      if (password) {
        user.password = password;
      }

      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  toggleProfilePrivacy: async (req, res) => {
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.isPublic = !user.isPublic;
      await user.save();
      res.json({ message: `Profile is now ${user.isPublic ? 'public' : 'private'}` });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.isPublic && (!req.user || !req.user.isAdmin)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  getAllProfiles: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export {userController}

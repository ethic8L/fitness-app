import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createError } from '../error.js';
import User from '../models/User.js';



dotenv.config();

export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img} = req.body;

        const existingUser = await User.findOne({ email }).exec();p
        if(existingUser){
            return next (createError(409, "Email is already in use"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, { expiresIn: '999 years' });
        return res.status(200).json({ token, user })
    } catch (err) {
        next(err)
    }
}

export const UserLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });
      if (!user) {
        return next(createError(404, "User not found"));
      }
      console.log(user);
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return next(createError(403, "Incorrect password"));
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "9999 years",
      });
  
      return res.status(200).json({ token, user });
    } catch (error) {
      return next(error);
    }
};

const getUserDashboard = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        
        const currentDateFormatted = new Date();
        const startToday = new Date(
          currentDateFormatted.getFullYear(),
          currentDateFormatted.getMonth(),
          currentDateFormatted.getDate()
        );
        const endToday = new Date(
          currentDateFormatted.getFullYear(),
          currentDateFormatted.getMonth(),
          currentDateFormatted.getDate() + 1
        );

        //calculte total calories burnt
        const totalCaloriesBurnt = await Workout.aggregate([
          { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
          {
            $group: {
              _id: null,
              totalCaloriesBurnt: { $sum: "$caloriesBurned" },
            },
          },
        ]);

    } catch (err) {
      next(err);     
    }
}
  

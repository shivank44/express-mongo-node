const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type : String,
            required : true,
            trim : true,
            min: 3,
            max: 20,
        },
        lastName: {
            type : String,
            required : true,
            trim : true,
            min: 3,
            max: 20,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin", "super-admin"],
            default: "user",
        },
    },
    {
        timestamps: true
    });


    userSchema.virtual("fullName").get(function () {
        return `${this.firstName} ${this.lastName}`;
      });
      
      userSchema.methods = {
        authenticate: async function (password) {
          return await bcrypt.compareSync(password, this.password);
        },
      };

module.exports = mongoose.model("users",userSchema);
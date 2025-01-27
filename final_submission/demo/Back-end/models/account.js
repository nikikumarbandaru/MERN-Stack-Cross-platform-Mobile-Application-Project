const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Define sub-schema for address
const AddressSchema = new Schema({
    country: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String
});

// Define the main user schema
const UserSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    hashedAndSaltedPassword: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    address: AddressSchema,
    vendors: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }], // Assuming reference to a Vendor model
    notificationActive: { type: Boolean, default: false },
    vendorpreferences: [{ type: String }],
    userRecomendations: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // Assuming reference to a Product model
});

UserSchema.plugin(passportLocalMongoose);
// Create and export the User model
const User = mongoose.model('Account', UserSchema)
module.exports = User;

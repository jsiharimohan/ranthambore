const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
	name: {
		type: String,
		required: [true, "fullname required!"],
		index: true,
	},
	avatar: {
		type: String
	},
	username: {
		type: String,
		required: [true, "username required!"],
		unique: [true, "duplicate username!"]
	},
	mobile: {
		type: String,
		default:'',
	},
	otp: {
		type: Number,
		default:0,
	},
	email: {
		type: String,
		required: [true, "email required!"],
		unique: [true, "email already exists in databases!"],
		lowercase: true,
		trim: true,
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: '{VALUE} is not a valid email!'
		}
	},
	password: {
		type: String,
		required: [true, "password required!"],
	},
	tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
},{
	timestamps:true
});

const Auth = mongoose.model('admins', AuthSchema);
module.exports = Auth;
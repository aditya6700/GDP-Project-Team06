const Users = require('../models/userModel');

// register route
module.exports.register = async (req, res) => {
    // object destructuring
    const { name, email, phone, password, cpassword, userType } = req.body;

    // basic validation
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: "Every field must be filled" });
    }
    else if (password !== cpassword) {
        return res.status(422).json({ message: "password and confirm password must be same" });
    }

    try {

        const user = new Users({ name, email, phone, password, cpassword, userType });
        const registerdUser = await user.save();

        res.status(201).json({ message: 'User registered', data: registerdUser });
    }
    catch (error) {
        console.log("Error:", error);
        res.status(422).json({
            message: 'unknown error',
            error
        });
    }
}

// login route
module.exports.login = (req,res) => {
    res.status(200).send('<h1>login page</h1>');
}
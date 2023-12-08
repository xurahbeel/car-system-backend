const User = require('../../models/user.model')


exports.sigin = async( req, res, next ) => {
  try{
    const { email , password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    console.log("user: " ,user)
    if(!user) {
      return res.status(404).json({ message: "User don't exist with this email" })}
    if(user.password !== password) return res.status(401).json({ message: "User password doesn't match" })
    return res.status(200).json({ email: user.email , message: "You have login sucessfully" })
  }
  catch( err) {
    res.json( err );
  }
}
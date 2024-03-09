const registerUser = async (req, res) => {

    const {FirstName, LastName, Email, Password } = req.body;

    res.json({
        FirstName,
        LastName,
        Email
    })
}

module.exports = { registerUser };
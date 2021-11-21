const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;

const updateStudentPassword = async (req,res) => {
    const password = req.body.password;
    const student = req.student;
    if(!passwordRegex.test(password)) return res.status(400).send("Invalid Password!");
    try {
        student.password = password;
        student.save();
        res.clearCookie('token');
        res.status(200).send("Password updated!")
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    res.send();
}

module.exports = {
    updateStudentPassword,
}
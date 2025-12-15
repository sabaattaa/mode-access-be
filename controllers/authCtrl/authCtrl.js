export const registerUser = (req, res) => {
    const { name, email, password, agree_terms_condition } = req.body;
    console.log("Register Api", req.body)
    res.json({ message: "Register API Working", name, email, password, agree_terms_condition });
};
export const login = (req, res) => {
    const { name, email, password, agree_terms_condition } = req.body;
    console.log("Login Api", req.body)
    res.json({ message: "Login API Working", name, email, password, agree_terms_condition });
};
export const logout = (req, res) => {
    const { name, email, password, agree_terms_condition } = req.body;
    console.log("logout Api", req.body)
    res.json({ message: "Login API Working", name, email, password, agree_terms_condition });
};

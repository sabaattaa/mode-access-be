import { createUserSrcv, loginUserSrvc } from "../../services/authSrcv/authSrvc.js";
import { api_response } from "../../utils/response.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, agree_terms_and_conditions } = req.body;

    if (!agree_terms_and_conditions) {
      return res.status(400).json(
        api_response("FAIL", "Please accept terms & conditions", null)
      );
    }

    const userRes = await createUserSrcv({
      name,
      email,
      password,
      agree_terms_and_conditions,
    });

    return res.status(201).json(userRes);

  } catch (error) {
    return res.status(500).json(
      api_response("FAIL", "User registration failed", null, error.message)
    );
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRes = await loginUserSrvc({ email, password });

    return res.status(200).json(userRes);

  } catch (error) {
    return res.status(500).json(
      api_response("FAIL", "User login failed", null, error.message)
    );
  }
};



export const logout = (req, res) => {
    const { name, email, password, agree_terms_and_conditions } = req.body;
    console.log("logout Api", req.body)
    res.json({ message: "Login API Working", name, email, password, agree_terms_and_conditions });
};

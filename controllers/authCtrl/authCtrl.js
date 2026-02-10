import { createUserSrcv, loginUserSrvc } from "../../services/authSrcv/authSrvc.js";
import { api_response } from "../../utils/response.js";
 
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import Guest from "../../models/customerModels/guestModel.js";

// Generate Guest ID
export const generateGuest = async (req, res) => {
    try {
        const guestId = `guest_${uuidv4()}`;

        const key = process.env.JWT_SECRET;

        const token = jwt.sign(
            { guest_id: guestId, type: "guest" },
            key,
        );
        const guest = await Guest.create({ guest_id: guestId });

        return res.status(200).json(
            api_response(
                "SUCCESS",
                "Guest token generated successfully",
                { token }
            )
        );

    } catch (error) {
        return res.status(500).json(
            api_response(
                "FAIL",
                "Failed to generate guest ID",
                null,
                error.message
            )
        );
    }
};

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
    res.json({ message: "Login API Working", name, email, password, agree_terms_and_conditions });
};

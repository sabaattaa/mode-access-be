import SocialLinksModal from "../../models/customerModels/socialLinksModel.js";
import { api_response } from "../../utils/response.js";

export const updateSocialLinksModal = async (req, res) => {
  try {
    const settings = await SocialLinksModal.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    return res.json(
      api_response("SUCCESS", "Site settings updated", settings)
    );

  } catch (error) {
    return res.status(500).json(
      api_response("FAIL", "Update failed", null, error.message)
    );
  }
};

export const getSocialLinksModal = async (req, res) => {
  try {
    const settings = await SocialLinksModal.findOne();
    return res.json(
      api_response("SUCCESS", "Site settings", settings)
    );
  } catch (error) {
    return res.status(500).json(
      api_response("FAIL", "Fetch failed", null, error.message)
    );
  }
};

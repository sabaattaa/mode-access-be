import  { fromZodError } from "zod-validation-error";

 
export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        
      const validationError = fromZodError(result.error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationError.details,
      });
 
    }
 
    req.body = result.data;
    next();
  };
};

 
export const validateQuery = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const validationError = fromZodError(result.error);
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: validationError.details,
      });
    }

    req.query = result.data;
    next();
  };
};

 
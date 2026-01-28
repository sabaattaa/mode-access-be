import z from "zod";



export const addressValidationSchema = z.object({
    isDefault: z.boolean({
        required_error: "Default home adress is required"
    }),
    city: z.string().min(3, "City length must be greater than 3"),
    postalCode: z.string().min(3, "Postal Code length must be greater than 5"),
    address: z.string().min(5, "Address length must be greater than 5"),
    addressType: z.enum(["home", "office"])

})
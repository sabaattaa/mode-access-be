import z from "zod";

export const OrderSchema = z.object({
  // user_id: z.string().min(1, 'User ID is required'),

  // total_price: z.number().positive('Total price must be positive'),
  // order_no: z.string('Order No is required'),
  phone: z.string('Phone No is required'),
  order_items: z.array(
    z.object({
      product_id: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().min(1).max(100),
      // price: z.number().positive(),
    })
  ).min(1, 'Order must have at least 1 item'),

  shipping_address: z.string().min(10, 'Shipping address must be at least 10 characters'),

  payment_method: z.enum(['COD', 'BANK',"JAZZCASH"]),
  shipping_method: z.enum(['standard', 'express',]),

  coupon_code: z.string()
    .nullable()
    .optional()
    .transform(code => code?.toUpperCase()),
});
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// تفعيل WebSocket (مهم جدًا لـ transactions)
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing!");
}

// ❌ لا تنشئ Pool يدويًا
// ✅ مرر connection string فقط
const adapter = new PrismaNeon({
  connectionString,
});
//  طريقة HTTP
// const adapter = new PrismaNeonHttp(connectionString, {})
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price?.toString() ?? "";
        },
      },
      rating: {
        compute(product) {
          return product.rating?.toString() ?? "";
        },
      },
    },
    cart: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(cart) {
          return cart.itemsPrice?.toString() ?? "0";
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(cart) {
          return cart.shippingPrice?.toString() ?? "0";
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(cart) {
          return cart.taxPrice?.toString() ?? "0";
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(cart) {
          return cart.totalPrice?.toString() ?? "0";
        },
      },
    },
    order: {
      itemsPrice: {
        needs: { itemsPrice: true },
        compute(order) {
          return order.itemsPrice?.toString() ?? "0";
        },
      },
      shippingPrice: {
        needs: { shippingPrice: true },
        compute(order) {
          return order.shippingPrice?.toString() ?? "0";
        },
      },
      taxPrice: {
        needs: { taxPrice: true },
        compute(order) {
          return order.taxPrice?.toString() ?? "0";
        },
      },
      totalPrice: {
        needs: { totalPrice: true },
        compute(order) {
          return order.totalPrice?.toString() ?? "0";
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem) {
          return orderItem.price?.toString() ?? "0";
        },
      },
    },
  },
});

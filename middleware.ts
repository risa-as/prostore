import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// استخدام export default هو الطريقة الأكثر أماناً لتعريف الميدل وير حالياً
export default NextAuth(authConfig).auth;

// يفضل دائماً إضافة matcher لتحديد المسارات التي يجب أن يعمل عليها الميدل وير
// هذا يمنع تشغيله على ملفات الصور والملفات الثابتة مما يحسن الأداء
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

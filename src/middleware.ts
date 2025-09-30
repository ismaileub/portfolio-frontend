// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard"] };

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect here if not authenticated
  },
});

export const config = { matcher: ["/dashboard/:path*"] };

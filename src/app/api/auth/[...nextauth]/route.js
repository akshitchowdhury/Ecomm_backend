import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Ecomm from "@/app/models/Ecomm";
import connectMongoDB from "@/app/lib/mongodb";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email } = user;
        try {
          await connectMongoDB();
          const userExists = await Ecomm.findOne({ email });

          if (!userExists) {
            const res = await fetch(`prcoess.env.NEXTAUTH_URL${/api/user}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
              }),
            });

            if (res.ok) {
              return true;
            }
          } else {
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
    async session({ session, token }) {
      await connectMongoDB()
      const dbUser = await Ecomm.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString(); // Add userId to session
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };

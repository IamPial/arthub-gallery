import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("arthub_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        default: "buyer",
      },
      plan: {
        default: "free",
      },
    },
  },

  //use databaseHooks for passing role & plan with google login
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          return {
            data: {
              ...userData,
              role: userData.role || "buyer",
              plan: userData.plan || "free",
            },
          };
        },
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
      strategy: "jwt",
    },
  },
  plugins: [jwt()],
});

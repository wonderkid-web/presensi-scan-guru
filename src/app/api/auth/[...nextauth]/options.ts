// @ts-nocheck
import { supabase } from "@/lib/supabaseClient";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      // @ts-ignore
      async authorize(credentials:Record<"email"|"password", string>|undefined, req) {
        // Add logic here to look up the user from the credentials supplied

        if (credentials) {
          try {
            const { data, error } = await supabase.from("user").select("*").eq("nip", credentials.email).eq("password", credentials.password);
            
            // const { data, error } = await supabase.auth.signInWithPassword({
            //   email: credentials.email,
            //   password: credentials.password,
            // });

            if (error) {
              return null
            }


            if (data) {
              return data[0];
            }
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        return { ...token };
      }
      return token;
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
};
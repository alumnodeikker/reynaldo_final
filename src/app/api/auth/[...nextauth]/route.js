import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Usuario simulado 
        if (credentials?.email === "test@correo.com" && credentials?.password === "123456") {
          return {
            id: "1",
            name: "Reynaldo Figuera",
            email: "yo@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
});

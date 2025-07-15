import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '../../../lib/mongoose';
import User from '../../../models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
 callbacks: {
  async session({ session }) {
    await connectDB();

    let user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      user = await User.create({ email: session?.user?.email });
    }

    session.user.id = user._id.toString();
    return session;
  },

  async redirect({ url, baseUrl }) {
    return `${baseUrl}/todo`;
  },
}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


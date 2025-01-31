import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId:
				'51153627717-nrn15rf5eoos3a1rf775t660sseoqv0g.apps.googleusercontent.com',
			clientSecret: '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',
		}),
	],
});

export { handler as GET, handler as POST };

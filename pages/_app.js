import { useState, useEffect } from 'react';
// import {  } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';

import { supabase, SupabaseContext } from '../db';
import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
			checkUser(),
		);
		checkUser();

		return () => {
			authListener?.unsubscribe();
		};
	}, []);

	async function checkUser() {
		const user = supabase.auth.user();

		setUser(user);
	}

	return (
		<ChakraProvider>
			<SupabaseContext.Provider value={supabase}>
				<Layout user={user}>
					<Component {...pageProps} />
				</Layout>
			</SupabaseContext.Provider>
		</ChakraProvider>
	);
}

export default MyApp;

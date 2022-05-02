import Head from 'next/head';

import server from '../consts/server';
import PhrasesList from '../components/phrasesList';
import styles from '../styles/Home.module.css';

export default function Home({ items }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>My English notes</title>
			</Head>

			<main className={styles.main}>
				<PhrasesList items={items} />
			</main>
		</div>
	);
}

export async function getServerSideProps() {
	const response = await fetch(`${server}/api/phrases`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		const items = await response.json();

		return {
			props: {
				items,
			},
		};
	}

	return { props: { items: [] } };
}

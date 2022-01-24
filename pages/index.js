import Head from 'next/head';
import Image from 'next/image';

import PhrasesList from '../components/phrasesList';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>My English notes</title>
			</Head>

			<main className={styles.main}>
				<PhrasesList items={[]} />
			</main>
		</div>
	);
}

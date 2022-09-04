import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

type Breadcrumb = {
	breadcrumb: string;
	href: string;
};

const Breadcrumbs: React.FC = () => {
	const router = useRouter();
	const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

	useEffect(() => {
		const linkPaths = router.asPath.split('/').filter((path) => path !== '');
		setBreadcrumbs(
			linkPaths.map((path, i) => {
				return {
					breadcrumb: decodeURI(path),
					href: `/${linkPaths.slice(0, i + 1).join('/')}`,
				};
			}),
		);
	}, [router]);

	return (
		<Breadcrumb separator="-">
			<BreadcrumbItem isCurrentPage={router.asPath === '/'}>
				<Link href="/" passHref>
					<BreadcrumbLink>Home</BreadcrumbLink>
				</Link>
			</BreadcrumbItem>
			{breadcrumbs.map((breadcrumb) => (
				<BreadcrumbItem
					key={breadcrumb.href}
					isCurrentPage={breadcrumb.href === router.asPath}
				>
					<Link href={breadcrumb.href} passHref>
						<BreadcrumbLink>{breadcrumb.breadcrumb}</BreadcrumbLink>
					</Link>
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	);
};

export default Breadcrumbs;

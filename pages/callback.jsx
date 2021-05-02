import React, { useEffect } from 'react';
import { withRouter } from 'next/router';

import {
	AddToHead,
	DescriptionMetaTag,
	handleDescription,
	KeywordsMetaTag,
	handleKeywords,
	TitleMetaTag,
	handleTitle,
} from '@/components/Meta/MetaTagsActions';
import auth0Client from '@/services/auth0';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const Callback = ({ router }) => {
	useEffect(async () => {
		await auth0Client.handleAuthentication().then(() => router.push('/'));
	}, []);
	return (
		<BaseLayout>
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'Callback Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['Callback Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'Callback Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> Varifying login data ... </h1>
			</BasePage>
		</BaseLayout>
	);
};

export default withRouter(Callback);

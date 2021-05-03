import React from 'react';

import {
	AddToHead,
	DescriptionMetaTag,
	handleDescription,
	KeywordsMetaTag,
	handleKeywords,
	TitleMetaTag,
	handleTitle,
} from '@/components/Meta/MetaTagsActions';
import withAuth from '../components/hoc/withAuth';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const Owner = ({ auth }) => {
	return (
		<BaseLayout {...auth}>
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'Owner Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['Owner Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'Owner Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> I am Owner Page </h1>
			</BasePage>
		</BaseLayout>
	);
};

export default withAuth()(Owner);

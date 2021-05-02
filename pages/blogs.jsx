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

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const Blogs = ({ auth }) => {
	return (
		<BaseLayout {...auth}>
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'Blogs Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['Blogs Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'Blogs Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> I am Blogs Page </h1>
			</BasePage>
		</BaseLayout>
	);
};

export default Blogs;

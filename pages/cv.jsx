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

const CV = () => {
	return (
		<BaseLayout>
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'CV Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['CV Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'CV Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> I am CV Page </h1>
			</BasePage>
		</BaseLayout>
	);
};

export default CV;

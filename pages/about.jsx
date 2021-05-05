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

const About = ({ auth }) => {
	return (
		<BaseLayout {...auth} className="about-page" title="I am About Page">
			<AddToHead
				elements={[
					TitleMetaTag({
						title: handleTitle({
							addFirst: 'About Page - ',
						}),
					}),
					KeywordsMetaTag({
						keywords: handleKeywords({
							addFirst: ['About Page'],
						}),
					}),
					DescriptionMetaTag({
						description: handleDescription({
							addFirst: 'About Page, ',
						}),
					}),
				]}
			/>
			<BasePage>
				<h1> I am About Page </h1>
			</BasePage>
		</BaseLayout>
	);
};

export default About;

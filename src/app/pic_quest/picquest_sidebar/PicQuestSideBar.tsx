import { SideBar } from '../../../components/custom/side_bar/SideBar';

const chatFour = [
	{ ans: 'I have a pet cat named Luna.', id: '1a2b3c4', qns: 'Do you have any pets?' },
	{ ans: 'I enjoy traveling to new places and experiencing different cultures.', id: '5d6e7f8', qns: 'What do you enjoy most about traveling?' },
	{
		ans: 'I am currently reading "The Alchemist" by Paulo Coelho.',
		id: '9g0h1i2',
		qns: 'What book are you currently reading?assssssssssssssssssssssssssssssssssssssssssssssssssssssss',
	},
	{ ans: 'I like both, but if I had to choose, I would pick winter for the snow.', id: '3j4k5l6', qns: 'Do you prefer summer or winter?' },
	{ ans: 'I like to cook and try out new recipes.', id: '7m8n9o0', qns: 'Do you enjoy cooking?' },
	{ ans: 'I am interested in learning Spanish.', id: 'p1q2r3s', qns: 'Is there a language you would like to learn?' },
	{ ans: 'I prefer watching movies.', id: 't4u5v6w', qns: 'Do you prefer watching movies or TV shows?' },
	{ ans: 'I enjoy spending time with friends and family.', id: 'x7y8z9a', qns: 'What do you like to do on weekends?' },
	{ ans: 'I like to stay active by going for walks and doing yoga.', id: 'b1c2d3e', qns: 'How do you stay active?' },
	{ ans: 'I enjoy watching documentaries and learning about new topics.', id: 'f4g5h6i', qns: 'What type of documentaries do you like?' },
];

export const PicQuestSideBar = () => {
	return <SideBar qnsAns={chatFour} />;
};

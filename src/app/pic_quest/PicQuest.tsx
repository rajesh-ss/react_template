// import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { FormEvent, useState } from 'react';
import { GiProcessor } from 'react-icons/gi';
import { FaRegUser } from 'react-icons/fa6';
import { nanoid } from '@reduxjs/toolkit';
import { IoAddCircleSharp } from 'react-icons/io5';
import { PicQuestModal } from '@/components/custom/modal/picQuestModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
// import { CalendarIcon } from '@radix-ui/react-icons';
import processingImage from '../../assets/processImage.png';

const chatFour = [
	{ ans: 'I have a pet cat named Luna.', id: '1a2b3c4', qns: 'Do you have any pets?' },
	{ ans: 'I enjoy traveling to new places and experiencing different cultures.', id: '5d6e7f8', qns: 'What do you enjoy most about traveling?' },
	{ ans: 'I am currently reading "The Alchemist" by Paulo Coelho.', id: '9g0h1i2', qns: 'What book are you currently reading?' },
	{ ans: 'I like both, but if I had to choose, I would pick winter for the snow.', id: '3j4k5l6', qns: 'Do you prefer summer or winter?' },
	{ ans: 'I like to cook and try out new recipes.', id: '7m8n9o0', qns: 'Do you enjoy cooking?' },
	{ ans: 'I am interested in learning Spanish.', id: 'p1q2r3s', qns: 'Is there a language you would like to learn?' },
	{ ans: 'I prefer watching movies.', id: 't4u5v6w', qns: 'Do you prefer watching movies or TV shows?' },
	{ ans: 'I enjoy spending time with friends and family.', id: 'x7y8z9a', qns: 'What do you like to do on weekends?' },
	{ ans: 'I like to stay active by going for walks and doing yoga.', id: 'b1c2d3e', qns: 'How do you stay active?' },
	{ ans: 'I enjoy watching documentaries and learning about new topics.', id: 'f4g5h6i', qns: 'What type of documentaries do you like?' },
];
export const PicQuest = () => {
	const [open, setOpen] = useState(false);

	const onSubmitChat = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const onClickAddBtn = () => {
		setOpen(true);
	};

	// console.log(import.meta.env.VITE_PICQUEST);
	return (
		<div className="w-full h-full border-red-600 px-4 py-0 h-full overflow-hidden scroll-bar-medium-w scroll-bar-transparent  scroll-bar-thumb-rounded scroll-bar-thumb-grey">
			<div className="h-[3rem] w-full flex items-center justify-between container border-b">
				<HoverCard>
					<HoverCardTrigger asChild>
						<h1 className="text-base font-extrabold dark:text-white">PicQuest</h1>
					</HoverCardTrigger>
					<HoverCardContent className="w-80 bg-[#fff] dark:bg-[#000] dark:text-white">
						<div className="flex justify-between space-x-4">
							<Avatar>
								<AvatarImage src={processingImage} />
								<AvatarFallback>PICQUEST</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<h4 className="text-sm font-semibold">PICQUEST</h4>
								<p className="text-sm">Here you can upload images to compare image and ask queries about the images</p>
							</div>
						</div>
					</HoverCardContent>
				</HoverCard>

				<PicQuestModal open={open} setOpen={setOpen}>
					<Button onClick={onClickAddBtn}>
						<IoAddCircleSharp className="h-7 w-7 hover:scale-105 dark:text-[#fff]" />
					</Button>
				</PicQuestModal>
			</div>
			<div className="pt-10  border-green-900 h-[calc(100vh-3.6rem-3rem-5rem)] overflow-x-hidden overflow-y-auto scroll-bar-medium-w scroll-bar-transparent   scroll-bar-thumb-rounded scroll-bar-thumb-grey bg-white dark:bg-[#000]">
				{chatFour?.map((eachChat) => (
					<div className={` px-4 py-2 rounded-[0.3rem]  gap-3 dark:text-white break-words container ${eachChat?.id}`} key={nanoid()}>
						<div className="p-2 my-3 flex gap-3 items-center ">
							<FaRegUser className="w-6 h-6 dark:text-[#cac8c8] " />
							<p className="break-words lg:max-w-[75%] dark:text-[#acaaaa] light text-sm">{eachChat?.qns}</p>
						</div>
						<div className="p-2 my-3 flex gap-3 items-center ">
							<GiProcessor className="w-6 h-6 dark:text-[#cac8c8] " />
							<p className="break-words lg:max-w-[75%] dark:text-[#acaaaa] text-sm">{eachChat?.ans}</p>
						</div>
					</div>
				))}
			</div>
			<section className=" h-[5rem] ">
				<form
					className="border-2 border-slate-300 container dark:border-[#2f2e2e] rounded-[0.5rem] flex w-full items-center justify-evenly bg-white dark:bg-[#000] px-1"
					onSubmit={onSubmitChat}
				>
					<input
						type="text"
						className="flex-1 dark:border-[#000] py-1 text-sm focus:border-0 min-h-[2.5rem] bg-white dark:bg-[#000] dark:text-white focus:outline-none"
					/>
					<Button type="button" className="hover:scale-x-110">
						<PaperPlaneIcon className=" h-6 w-6 border-0 dark:text-white" />
					</Button>
				</form>
			</section>
		</div>
	);
};

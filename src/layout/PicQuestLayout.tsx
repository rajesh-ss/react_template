import { PicQuestSideBar } from '@/app/pic_quest/picquest_sidebar/PicQuestSideBar';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

export const PicQuestLayout = () => {
	const IsPicQuestSideBarOpenState = useSelector((state: RootState) => state.handleSideBars.IsPicQuestSideBarOpen);

	return (
		<>
			<PicQuestSideBar />
			<section className={` bg-white dark:bg-[#000] ${IsPicQuestSideBarOpenState ? 'w-[calc(100vw-18vw)]' : ' w-[100vw]'}`}>
				<Outlet />
			</section>
		</>
	);
};

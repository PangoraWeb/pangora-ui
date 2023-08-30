import {Image} from "@nextui-org/react";
import NextImage from "next/image";

interface PostArguments {
    title: string;
    upvotes: number;
    comments: number;
    newComments?: number;
    user: string;
    community: string;
    communityIcon: string;
    time: string;
    image: string;
    colors: string;
    avatar: string;
}

const Post = ({ title, upvotes, comments, newComments, user, community, communityIcon, time, image, colors, avatar }: PostArguments) => {
    return (
        <div className="flex m-2 p-2 border-2 border-slate-600 items-center rounded-lg bg-gradient-to-r from-slate-800 to-slate-900">
            <div className="text-slate-500 mr-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4.5 24 24" width="24" fill="currentColor"><path d="M6 4.071l-3.95 3.95A1 1 0 0 1 .636 6.607L6.293.95a.997.997 0 0 1 1.414 0l5.657 5.657A1 1 0 0 1 11.95 8.02L8 4.07v9.586a1 1 0 1 1-2 0V4.07z"></path></svg>
                <p>{upvotes}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4.5 24 24" width="24" fill="currentColor"><path d="M8 11.243l3.95-3.95a1 1 0 1 1 1.414 1.414l-5.657 5.657a.997.997 0 0 1-1.414 0L.636 8.707A1 1 0 1 1 2.05 7.293L6 11.243V1.657a1 1 0 1 1 2 0v9.586z"></path></svg>
            </div>
            {
                image && <Image as={NextImage} src={image} alt="alt" width="90" height="90" className="rounded-lg max-h-[90px]" isZoomed isBlurred />
            }
            {
                (!image) && <div className="h-[90px] w-[90px] flex items-center justify-center bg-slate-700 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="24" fill="currentColor"><path d="M9.378 12H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1 1 1 0 0 1 1 1v3.013L9.378 12zM3 0h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.006V14a2 2 0 0 1-2-2V3a3 3 0 0 1 3-3z"></path></svg>
                </div>
            }
            <div className="m-2">
                <p className="text-xl px-1">{title}</p>
                <div className="flex text-sm">
                    <div className={`flex items-center p-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500`}>
                        <Image src={avatar} alt="alt" width="24" height="24" className="rounded-full max-h-[24px]" />
                        <p className="ml-2 pb-1">{user}</p>
                    </div>
                    <p className="p-1">to</p>
                    <div className={`flex items-center p-1 text-transparent bg-clip-text bg-gradient-to-r ${colors}`}>
                        <Image src={communityIcon} alt="alt" width="24" height="24" className="rounded-full" />
                        <p className="ml-2 pb-1">{community}</p>
                    </div>
                    <p className="p-1">•</p>
                    <p className="p-1">{time}</p>
                </div>
                <div className="flex items-center text-slate-400 p-1 text-sm">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="18" fill="currentColor"><path d="M9.378 12H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1 1 1 0 0 1 1 1v3.013L9.378 12zM3 0h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.958l-6.444 4.808A1 1 0 0 1 2 18.006V14a2 2 0 0 1-2-2V3a3 3 0 0 1 3-3z"></path></svg>
                        <p className="px-2">{comments} {newComments && <i>({newComments} New)</i>}</p>
                    </div>
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="18" fill="currentColor"><path d="M10 13.554l3.517 1.85-.672-3.917 2.846-2.774-3.932-.571L10 4.579 8.241 8.142l-3.932.571 2.846 2.774-.672 3.916L10 13.554zm0 2.26L3.827 19.06l1.179-6.875L.01 7.317l6.902-1.003L10 .06l3.087 6.254 6.902 1.003-4.995 4.868 1.18 6.875L10 15.814z"></path></svg>
                    </div>
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" width="18" fill="currentColor"><path d="M6 15H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3h3l3 3v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3zm0-2V7a2 2 0 0 1 2-2h2V2H2v11h4zm8.172-6H8v11h8V8.828L14.172 7z"></path></svg>
                    </div>
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-9 -2 24 24" width="18" fill="currentColor"><path d="M3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;
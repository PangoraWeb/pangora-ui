import Post from "./post";
import Quote from "./quote";
import Scope from "./scope";
import Sort from "./sort";

const Feed = () => {
    return (
        <div className="w-2/3">
            <Quote />
            <div className="flex justify-between">
                <Scope />
                <Sort />
            </div>
            <div>
                <Post 
                    title="Most and Least Verbose Programming Languages" 
                    upvotes={174} 
                    time="8 hours ago" 
                    community="Programming" 
                    user="pwshguy (mdowst)" 
                    image="/image1.png" 
                    colors="from-blue-400 to-violet-500"
                    communityIcon="/community.png"
                    avatar="/avatar2.jpeg"
                    comments={65}
                    newComments={35}
                />
                <Post 
                    title="I know, I know, but this revision compiles" 
                    upvotes={610} 
                    time="10 hours ago" 
                    community="Programmer Humor" 
                    user="casualhippo@sh.itjust.works" 
                    image="/image2.webp" 
                    colors="from-yellow-400 to-orange-500"
                    communityIcon="/community2.png"
                    avatar="/avatar3.png"
                    comments={19}
                    newComments={11}
                />
                <Post 
                    title="The impossibly small web framework for Python and MicroPython by Miguel Grinberg"
                    upvotes={6}
                    time="3 hours ago"
                    community="Python"
                    user="ds12"
                    colors="from-blue-400 to-yellow-500"
                    communityIcon="/community3.png"
                    avatar="/avatar4.jpeg"
                    comments={2}
                />
                <Post 
                    title="ltorah | a command line Torah reader"
                    upvotes={0}
                    time="1 hour ago"
                    community="Cool GitHub Projects"
                    user="Mandrew002@lemm.ee"
                    colors="from-pink-400 to-rose-500"
                    communityIcon="/community4.png"
                    avatar="/avatar5.webp"
                    comments={0}
                />
                <Post 
                    title="The Pyhon dictionary dispatch pattern"
                    upvotes={27}
                    time="12 hours ago"
                    community="Python"
                    user="PythOnRails"
                    colors="from-blue-400 to-yellow-500"
                    communityIcon="/community3.png"
                    avatar="/avatar3.png"
                    comments={9}
                />
                <Post 
                    title="The Pyhon dictionary dispatch pattern"
                    upvotes={27}
                    time="12 hours ago"
                    community="Python"
                    user="PythOnRails"
                    colors="from-blue-400 to-yellow-500"
                    communityIcon="/community3.png"
                    avatar="/avatar3.png"
                    comments={9}
                />
                <Post 
                    title="The Pyhon dictionary dispatch pattern"
                    upvotes={27}
                    time="12 hours ago"
                    community="Python"
                    user="PythOnRails"
                    colors="from-blue-400 to-yellow-500"
                    communityIcon="/community3.png"
                    avatar="/avatar3.png"
                    comments={9}
                />
                <Post 
                    title="The Pyhon dictionary dispatch pattern"
                    upvotes={27}
                    time="12 hours ago"
                    community="Python"
                    user="PythOnRails"
                    colors="from-blue-400 to-yellow-500"
                    communityIcon="/community3.png"
                    avatar="/avatar3.png"
                    comments={9}
                />
            </div>
        </div>
    )
}

export default Feed;
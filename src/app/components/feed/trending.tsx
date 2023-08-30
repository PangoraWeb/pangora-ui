import Image from "next/image";
import TrendingCommunity from "./trendingCommmunity";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";

const Trending = () => {
    return (
        <Card className="border-2 border-slate-400 bg-black p-4 m-4 shadow-md text-white flex" isBlurred >
            <CardHeader>
                <h4 className="font-semibold leading-none">Trending Communities</h4>
            </CardHeader>
            <TrendingCommunity
                name="Community Showcase"
                users={19}
                posts={1}
                comments={0}
                icon="/showcase.png"
                slug="community_showcase"
                colors="from-yellow-600 via-black to-orange-600"
            />
            <TrendingCommunity
                name="Helix Editor"
                users={12}
                posts={1}
                comments={3}
                icon="/trend1.png"
                slug="helix"
                colors="from-blue-600 via-black to-purple-600"
            />
            <TrendingCommunity
                name="Battlestations"
                users={18}
                posts={1}
                comments={0}
                icon="/trend2.png"
                slug="battlestations"
                colors="from-yellow-600 via-black to-purple-600"
            />
            <TrendingCommunity
                name="Engineering Resumes"
                users={121}
                posts={0}
                comments={0}
                icon="/trend3.png"
                slug="engineering_resumes"
                colors="from-pink-600 via-black to-yellow-600"
            />
            <TrendingCommunity
                name="Experienced Devs"
                users={3037}
                posts={59}
                comments={909}
                icon="/trend4.webp"
                slug="experienced_devs"
                colors="from-slate-600 via-black to-blue-600"
            />
        </Card>
        /*<div className="border-2 border-slate-400 rounded p-4 m-4 shadow-md">
            <p className="text-xl p-2 text-slate-300">Trending Communities</p>
            <ul className="p-2 text-slate-400">
                <TrendingCommunity
                    name="Community Showcase"
                    users={19}
                    posts={1}
                    comments={0}
                    icon="/showcase.png"
                />
                <TrendingCommunity
                    name="Helix Editor"
                    users={12}
                    posts={1}
                    comments={3}
                    icon="/trend1.png"
                />
                <TrendingCommunity
                    name="Battlestations"
                    users={18}
                    posts={1}
                    comments={0}
                    icon="/trend2.png"
                />
                <TrendingCommunity
                    name="Engineering Resumes"
                    users={121}
                    posts={0}
                    comments={0}
                    icon="/trend3.png"
                />
                <TrendingCommunity
                    name="Experienced Devs"
                    users={3037}
                    posts={59}
                    comments={909}
                    icon="/trend4.webp"
                />
            </ul>
        </div>*/
    )
}

export default Trending;
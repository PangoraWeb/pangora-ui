import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";

const Sort = () => {
    return (
        <ul className="divide-x-2 divide-slate-400 flex items-center h-30 border-2 m-2 rounded border-slate-400 text-slate-400 text-sm">
            <li className="py-2 px-6 bg-slate-400 text-slate-800">
                Active
            </li>
            <li className="py-2 px-6">
                Hot
            </li>
            <li className="py-2 px-6">
                Top
            </li>
            <li className="py-2 px-6">
                New
            </li>
            <li className="py-2 px-2">
                <Dropdown backdrop="opaque" className="bg-slate-600">
                    <DropdownTrigger>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -8 24 24" width="18" fill="currentColor"><path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path></svg>
                        </li>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" className="text-slate-200">
                        <DropdownSection classNames={{heading: "text-slate-400", divider: "text-slate-400"}} title="Top Within X" showDivider>
                            <DropdownItem classNames={{description: "text-slate-300", shortcut: "text-slate-300"}} key="top-hour" shortcut="CTRL+SHIFT+1" description="Show posts made within the last hour" startContent={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path></svg>}>Top Hour</DropdownItem>
                            <DropdownItem classNames={{description: "text-slate-300", shortcut: "text-slate-300"}} key="top-six-hours" shortcut="CTRL+SHIFT+2" description="Show posts made within the last six hours" startContent={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor"><path d="M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path></svg>}>Top 6 Hours</DropdownItem>
                        </DropdownSection>
                        <DropdownSection classNames={{heading: "text-slate-400", divider: "text-slate-400"}} title="Post Comments" showDivider>
                            <DropdownItem classNames={{description: "text-slate-300", shortcut: "text-slate-300"}} key="new-comments" shortcut="CTRL+SHIFT+3" description="Show posts that recently have had a comment on it" startContent={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="24" fill="currentColor"><path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zm.844-3.093a.536.536 0 0 0 .26-.069l2.355-1.638A1 1 0 0 1 7.686 13H12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5c0 .54.429.982 1 1 .41.016.707.083.844.226.128.134.135.36.156.79.003.063.003.177 0 .37a.5.5 0 0 0 .5.5z"></path><path d="M16 10.017a7.136 7.136 0 0 0 0 .369v-.37c.02-.43.028-.656.156-.79.137-.143.434-.21.844-.226.571-.018 1-.46 1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z"></path></svg>}>New Comments</DropdownItem>
                            <DropdownItem classNames={{description: "text-slate-300", shortcut: "text-slate-300"}} key="most-comments" shortcut="CTRL+SHIFT+4" description="Show posts that have had the most comments within all time" startContent={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="24" fill="currentColor"><path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zm.844-3.093a.536.536 0 0 0 .26-.069l2.355-1.638A1 1 0 0 1 7.686 13H12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5c0 .54.429.982 1 1 .41.016.707.083.844.226.128.134.135.36.156.79.003.063.003.177 0 .37a.5.5 0 0 0 .5.5z"></path><path d="M16 10.017a7.136 7.136 0 0 0 0 .369v-.37c.02-.43.028-.656.156-.79.137-.143.434-.21.844-.226.571-.018 1-.46 1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z"></path></svg>}>Most Comments</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                
            </li>
        </ul>
    )
}

export default Sort;
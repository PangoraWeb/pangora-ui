import Link from "next/link";
import {Badge} from "@nextui-org/react";
import { DropdownSection, ButtonGroup, Avatar, Image, Navbar as NavBase, NavbarBrand, NavbarContent, NavbarItem, Input, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import NextImage from "next/image";
import React from "react";

const Navbar = () => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["all"]));

    const selectedValue = React.useMemo(
        () => convertToSearchText(Array.from(selectedKeys).join(", ").replaceAll("_", " ")),
        [selectedKeys]
    );

    function setKey(keys: any): any {
        setSelectedKeys(keys);
    }

    function convertToSearchText(input: string) {
        switch(input) {
            case "all":
                return "Search...";
            case "comments":
                return "Search Comments...";
            case "users":
                    return "Search Users...";
            case "posts":
                return "Search Posts...";
            case "url":
                return "Search for a URL...";
            case "communities":
                return "Search Communities...";
        }
    }
    
    return (
        <NavBase isBordered maxWidth="2xl">
            <NavbarBrand className="grow-0 text-2xl">
                <Image 
                    as={NextImage}
                    src="/logo.png"
                    alt="profile picture"
                    width="48"
                    height="48"
                    className="mr-2 rounded-md min-w-[48px] min-h-[48px]"
                    isZoomed
                    isBlurred 
                />

                <Link href="/" title="Community List">
                    programming.dev
                </Link>
                
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarItem>
                    <Link href="/communities" title="Community List">
                        Communities
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/create_post" title="Create Post">
                        Create Post
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/request_community" title="Request Community">
                        Request Community
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/donate" title="Donate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -4 24 24" width="22" fill="currentColor"><path d="M3.636 7.208L10 13.572l6.364-6.364a3 3 0 1 0-4.243-4.243L10 5.086l-2.121-2.12a3 3 0 0 0-4.243 4.242zM9.293 1.55l.707.707.707-.707a5 5 0 1 1 7.071 7.071l-7.07 7.071a1 1 0 0 1-1.415 0l-7.071-7.07a5 5 0 1 1 7.07-7.071z"></path></svg>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[14rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        labelPlacement="inside"
                        placeholder={selectedValue}
                        size="md"
                        startContent={<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24" width="22" fill="currentColor"><path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path></svg>}
                        type="search"
                        isClearable
                    />
                </NavbarItem>
                <NavbarItem>
                    <Dropdown placement="bottom-end" className="bg-black">
                        <DropdownTrigger>
                            <Button isIconOnly className="bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -8 24 24" width="24" fill="currentColor"><path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path></svg>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setKey}
                        >
                            <DropdownSection title="Search Categories" showDivider> 
                                <DropdownItem key="all" description="Search for everything">All</DropdownItem>
                                <DropdownItem key="comments" description="Search for comments">Comments</DropdownItem>
                                <DropdownItem key="posts" description="Search for posts">Posts</DropdownItem>
                                <DropdownItem key="communities" description="Search for communities">Communities</DropdownItem>
                                <DropdownItem key="users" description="Search for users">Users</DropdownItem>
                                <DropdownItem key="url" description="Search for a URL">URL</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/admin" title="Admin">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="22" fill="currentColor"><path d="M20 8.163A2.106 2.106 0 0 0 18.926 10c0 .789.433 1.476 1.074 1.837l-.717 2.406a2.105 2.105 0 0 0-2.218 3.058l-2.062 1.602A2.104 2.104 0 0 0 11.633 20l-3.29-.008a2.104 2.104 0 0 0-3.362-1.094l-2.06-1.615A2.105 2.105 0 0 0 .715 14.24L0 11.825A2.106 2.106 0 0 0 1.051 10C1.051 9.22.63 8.54 0 8.175L.715 5.76a2.105 2.105 0 0 0 2.207-3.043L4.98 1.102A2.104 2.104 0 0 0 8.342.008L11.634 0a2.104 2.104 0 0 0 3.37 1.097l2.06 1.603a2.105 2.105 0 0 0 2.218 3.058L20 8.162zM14.823 3.68c0-.063.002-.125.005-.188l-.08-.062a4.103 4.103 0 0 1-4.308-1.428l-.904.002a4.1 4.1 0 0 1-4.29 1.43l-.095.076A4.108 4.108 0 0 1 2.279 7.6a4.1 4.1 0 0 1 .772 2.399c0 .882-.28 1.715-.772 2.4a4.108 4.108 0 0 1 2.872 4.09l.096.075a4.104 4.104 0 0 1 4.289 1.43l.904.002a4.1 4.1 0 0 1 4.307-1.428l.08-.062A4.108 4.108 0 0 1 17.7 12.4a4.102 4.102 0 0 1-.773-2.4c0-.882.281-1.716.773-2.4a4.108 4.108 0 0 1-2.876-3.919zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="5" color="primary">
                        <Link href="/inbox" title="Inbox">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3 -2 24 24" width="22" fill="currentColor"><path d="M13.666 11.782L13 11.186V6a4 4 0 1 0-8 0v5.186l-.666.596A6.987 6.987 0 0 0 2.29 15h13.42a6.987 6.987 0 0 0-2.044-3.218zM12 17a3 3 0 0 1-6 0H0a8.978 8.978 0 0 1 3-6.708V6a6 6 0 1 1 12 0v4.292A8.978 8.978 0 0 1 18 17h-6zm-3 1a1 1 0 0 0 1-1H8a1 1 0 0 0 1 1z"></path></svg>
                        </Link>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="1" color="secondary">
                        <Link href="/reports" title="Reports">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -2 24 24" width="22" fill="currentColor"><path d="M2 4.386V8a9.02 9.02 0 0 0 3.08 6.787L8 17.342l2.92-2.555A9.019 9.019 0 0 0 14 8V4.386l-6-2.25-6 2.25zM.649 2.756L8 0l7.351 2.757a1 1 0 0 1 .649.936V8c0 3.177-1.372 6.2-3.763 8.293L8 20l-4.237-3.707A11.019 11.019 0 0 1 0 8V3.693a1 1 0 0 1 .649-.936z"></path></svg>
                        </Link>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="1" color="default">
                        <Link href="/registration_application" title="Registration Applications">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -2 24 24" width="22" fill="currentColor"><path d="M5 2v2h4V2H5zm6 0h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zm0 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2H2v14h10V4h-1zM4 8h6a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path></svg>
                        </Link>
                    </Badge>
                </NavbarItem>
                <NavbarItem>
                <Dropdown className="bg-black">
                    <DropdownTrigger className="text-base">
                        <Button 
                            variant="bordered"
                            className="text-white rounded-full"
                            isIconOnly
                        >
                            <Avatar src="/avatar.png" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownSection showDivider>
                            <DropdownItem key="profile">Profile</DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem key="logout">
                                Info
                            </DropdownItem>
                            <DropdownItem key="logout">
                                Terms & Policies
                            </DropdownItem>
                            <DropdownItem key="logout" className="text-success" color="success">
                                Donate
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownSection showDivider>
                            <DropdownItem key="logout" className="text-danger" color="danger">
                                Logout
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                </NavbarItem>
            </NavbarContent>
        </NavBase>
    )
}
/*<button type="button" className="flex items-center border-2 px-4 py-1 border-slate-700 rounded">
                        <Image src="/avatar.png" alt="profile picture" width="24" height="24"className="mr-2 rounded-md"></Image>
                        <p>Ategon</p>
                    </button>*/
export default Navbar;
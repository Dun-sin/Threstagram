import React,{ useRef, useState } from "react";

import Image from "next/image";

import { type User } from "../utils/types";

type PreviewCardProps = {
    index: number;
    content: string;
    color: string;
    fontFamily: string;
    postContent: string[];
    setPostContent: React.Dispatch<React.SetStateAction<string[]>>;
    postUser: User;
    hideMenubar: boolean
};
const PreviewCard = (props: PreviewCardProps) => {
    const {
        index,
        content,
        color,
        fontFamily,
        postContent,
        setPostContent,
        postUser,
        hideMenubar
    } = props;
    const [editing, setEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLSpanElement>(null);
    return (
        <div
            className={`min-h-[337.5px] max-h-[337.5px] h-[337.5px] min-w-[270px] max-w-[270px] w-[270px] flex justify-between flex-col rounded-md p-4 snap-center instagram-${index} overflow-y-scroll`}
            key={index}
            style={{ backgroundColor: color, fontFamily }}
            id="card-container"
        >
            {(!hideMenubar || postContent.length > 1) &&  <div className="text-fmd font-semibold border-b w-full border-secondary border-spacing-5 h-[10%] items-center flex justify-between py-2">
                {postContent.length !== 1 && <span>{index}</span>}
                {!hideMenubar && <span
                    onClick={() => setEditing(true)}
                    className="ml-auto float-right text-f2xs cursor-pointer"
                >edit</span>}
            </div>
}
            <span
                ref={inputRef}
                contentEditable={editing}
                className={`text-f2xs h-[80%] flex items-center`}
            >
                {content}
            </span>
            {editing && (
                <div
                    className="text-brand bg-white rounded-md  p-2.5 my-3 font-medium w-full mx-auto flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        const input = inputRef.current.textContent;
                        if (input) {
                            setPostContent((prev) => {
                                const newPostContent = [...prev];
                                newPostContent[index] = input;
                                return newPostContent;
                            });
                        }
                        setEditing(false);
                    }}
                >
                    Save
                </div>
            )}
            <span className="flex gap-2 items-center border-t border-secondary border-spacing-5 min-h-[10%] py-2">
                <div className="h-8 w-8 rounded-full relative overflow-hidden border-2 border-secondary  border-spacing-6">
                    <Image
                        src={postUser.avatar}
                        alt={postUser.username}
                        quality={100}
                        fill
                        className="object-cover"
                    />
                </div>
                <p className="text-fxs font-medium">@{postUser.username}</p>
            </span>
        </div>
    );
};
export default PreviewCard;

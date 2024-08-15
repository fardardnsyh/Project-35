import React from "react";

type MessageType = {
	role: string;
	content: string;
};

const Message = ({ messages }: { messages: MessageType[] }) => {
	return (
		<div>
			{messages.map((item, index) => (
				<div
					key={index}
					className={`flex ${
						item.role === "user" ? "justify-end" : "justify-start"
					} mb-4`}>
					<div
						className={`max-w-[70%] rounded-lg p-2 ${
							item.role === "user"
								? "bg-zinc-500 text-white"
								: "bg-zinc-800 text-zinc-300"
						}`}>
						<p>{item.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Message;

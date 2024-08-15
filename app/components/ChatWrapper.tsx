"use client";

import { useChat } from "ai/react";
import { SendIcon } from "lucide-react";
import Message from "./Message";

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
	const { messages, handleInputChange, input, handleSubmit } = useChat({
		api: "/api/chat-stream",
		body: { sessionId },
	});

	return (
		<div className="relative h-screen bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between ">
			<div className="m-4">
				<div className="text-zinc-500 my-auto mb-4 font-semibold text-2xl">
					ASK THIS WEBSITE
				</div>
				<hr />
				<div className="mt-12">
					<Message messages={messages} />
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex justify-between w-full divide-zinc-700">
					<input
						value={input}
						onChange={handleInputChange}
						type="text"
						className="m-6 w-full rounded-3xl py-2 pl-4 bg-zinc-600 placeholder:text-gray-400 placeholder:pl-2 text-xs"
						placeholder="Ask the website"
					/>

					<button type="submit" className="mx-auto mr-8">
						<SendIcon size={20} className="text-zinc-400 hover:opacity-80 transition-all"  />
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChatWrapper;

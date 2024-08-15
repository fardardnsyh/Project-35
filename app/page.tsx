"use client"

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const [url, setUrl] = useState("");

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		if (url) {
			router.push(`/${url}`);
		}
	}

	return (
		<main className="relative h-screen bg-zinc-900 flex justify-between">
			<div className="mx-auto my-auto">
				<div className="max-w-[350px]">
					Welcome to <span className="font-bold">Insight AI</span>. Where you can chat with any website you want.
				</div>
				<form onSubmit={handleSubmit}>
					<div className="flex justify-between w-full divide-zinc-700">
						<input
							name="url"
							type="text"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							className="my-6 mr-2 w-full rounded-3xl py-2 pl-4 bg-zinc-600 placeholder:text-gray-400 placeholder:pl-2 text-xs"
							placeholder="Enter website"
						/>

						<button type="submit" className="mx-auto mr-8">
							<ArrowRight
								size={20}
								className="text-zinc-400 hover:opacity-80 transition-all"
							/>
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}

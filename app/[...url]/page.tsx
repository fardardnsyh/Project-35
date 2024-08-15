import ChatWrapper from "../components/ChatWrapper";
import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";

interface PageProps {
	params: {
		url: string | string[] | undefined;
	};
}

function deconstructUrl({ url }: { url: string[] }) {
	const decodedComps = url.map((comp) => decodeURIComponent(comp));
	return decodedComps.join("/");
}

const page = async (params: PageProps) => {
	const reconUrl = deconstructUrl({ url: params.params.url as string[] });

	const isAlreadyIndexed = await redis.sismember("indexed-urls", reconUrl);

	const sessionId = "mock-session";

	if (!isAlreadyIndexed) {
		await ragChat.context.add({
			type: "html",
			source: reconUrl,
			config: { chunkOverlap: 50, chunkSize: 200 },
		});

		await redis.sadd("indexed-urls", reconUrl);
	}

	return <ChatWrapper sessionId={sessionId} />;
};

export default page;

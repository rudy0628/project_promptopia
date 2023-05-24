import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		// params.id is the id from api/users/[id]/posts
		const prompts = await Prompt.find({ creator: params.id }).populate(
			'creator'
		);

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
};

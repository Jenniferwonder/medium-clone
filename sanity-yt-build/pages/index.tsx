import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
	posts: [Post];
}

export default function Home({ posts }: Props) {
	return (
		<div className="max-w-7xl mx-auto">
			<Head>
				<title>Medium Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Include the Header Component */}
			<Header />

			<div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
				<div className="px-10 space-y-5">
					<h1 className="text-6xl max-w-xl font-serif">
						<span className="underline decoration-black decoration-4">
							Medium
						</span>{" "}
						is a place to write, read and connect
					</h1>
					<h2>
						It's easy and free to post your thinking on any topic and connect
						with millions of readers.
					</h2>
				</div>
				<div>
					<img
						className="hidden md:inline-flex h-32 lg:h-full"
						src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
						alt=""
					/>
				</div>
				{/* Posts */}
			</div>
		</div>
	);
}

/* Get the Server Side Rendered Data back to the Client*/
export const getServerSideProps = async () => {
	const query = `*[_type =="post"]{
		_id,
		title,
		author->{
		name,
		image
	},
	description,
	mainImage,
	slug
	}`;
	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
};

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import groq from "groq";
import { ArrowRight } from "~/components/Icon";
import { urlFor } from "~/sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data: initial } = await loadQuery(ARTICLES_QUERY);

  return json({
    initial,
  });
}

export default function ArticlesIndex() {
  const { initial } = useLoaderData<typeof loader>();

  const { loading, data } = useQuery(ARTICLES_QUERY);

  return (
    <div>
      <h1 className="w-full py-5 md:py-20 text-center font-heading text-6xl md:text-8xl">
        Articles
      </h1>
      {/* @ts-ignore */}
      <ArticleList articles={loading || !data ? initial : data} />
    </div>
  );
}

function ArticleList({ articles }: { articles: ArticleListItem[] }) {
  if (!articles) return <div>🥃 Cheers! Check back later!</div>;

  return (
    <div className="grid grid-cols-1 place-content-center md:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article._id} {...article} />
      ))}
    </div>
  );
}

type ArticleListItem = {
  _id: string;
  title: string;
  to: string;
  mainImage: any;
  mainImageAlt: string;
  excerpt: string;
};

function ArticleCard(props: ArticleListItem) {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={props.to} className="aspect-[2/5] overflow-hidden">
        <img
          className="rounded-t-lg object-cover"
          // prettier-ignore
          src={props.mainImage ? urlFor(props.mainImage).width(500).height(200).format('webp').url() : "https://picsum.photos/500/200"}
          alt={props.mainImageAlt ?? "Image"}
        />
      </Link>
      <div className="p-5">
        <Link to={props.to}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.title ?? "Title"}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.excerpt ?? "Excerpt"}
        </p>
        <Link
          to={props.to}
          className="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-black/50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <ArrowRight height={18} width={18} color="white" />
        </Link>
      </div>
    </div>
  );
}

const ARTICLES_QUERY = groq`*[_type == "article"]{
  _id,
  title,
  "to": "/articles/" + slug.current,
  "mainImage": hero.image,
  "mainImageAlt": hero.image.alt,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..140], "") + "..."
}`;
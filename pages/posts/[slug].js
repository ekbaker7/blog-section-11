import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllPostSlugs, getPostBySlug } from "../../lib/posts-util";
import Head from "next/head";

function PostDetailsPage(props) {
  const { post } = props;

  return (
    <Fragment>
      <Head>
        <title>{post.title} | Emmett's Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;
  const post = getPostBySlug(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths(context) {
  const slugs = getAllPostSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailsPage;

import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

function AllPosts(props) {
  const { posts } = props

  return <section>
    <h1>All Posts</h1>
    <PostsGrid posts={posts} />
  </section>;
}

export default AllPosts;

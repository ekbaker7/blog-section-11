import matter from "gray-matter";
import fs from "fs";
import path from "path";

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");

function getPostData(postIdentifier) {
  const slug = postIdentifier.replace(/\.md$/, "")
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    ...data,
    slug,
    content,
  };
}

function getAllPostsFromDirectory () {
    return fs.readdirSync(POSTS_DIRECTORY)
}

export function getAllPosts() {
  const postFiles = getAllPostsFromDirectory()
  const allPostsData = postFiles.map((fileName) => getPostData(fileName));

  const sortedPosts = allPostsData.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPostsData = getAllPosts();
  const featuredPosts = allPostsData.filter((post) => post.isFeatured);

  return featuredPosts;
}

export function getPostBySlug (slug) {
    return getPostData(slug)
}

export function getAllPostSlugs () {
  const postFiles = getAllPostsFromDirectory()
  const allPostsSlugs = postFiles.map((fileName) => fileName.replace(/\.md$/, ''));

  return allPostsSlugs;
}
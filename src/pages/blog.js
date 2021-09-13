import matter from "gray-matter";
import Link from "next/link";

const Blog = (props) => {
  console.log(props);
  return (
    <div>
      <h1>ブログページ</h1>
      {props.blogs.map((blog, index) => (
        <div key={index}>
          <h3>{blog.frontmatter.title}</h3>
          <p>{blog.frontmatter.date}</p>
          <Link href={`/blog/${blog.slug}`}>
            <a>Read More</a>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Blog;

export async function getStaticProps() {
  const blogs = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);
    console.log(keys);
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\]\\/]/, "").slice(0, -3);
      const value = values[index];
      const document = matter(value.default);

      return {
        frontmatter: document.data,
        slug: slug,
      };
    });
    return data;
  })(require.context("../data", true, /\.md$/));

  console.log(blogs);
  return {
    props: {
      blogs: blogs,
    },
  };
}

import matter from "gray-matter";

const Blog = (props) => {
  console.log(props);
  return <h1>ブログページ</h1>;
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
    props: {},
  };
}

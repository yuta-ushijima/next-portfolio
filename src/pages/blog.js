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
    console.log(values);
  })(require.context("../data", true, /\.md$/));

  return {
    props: {},
  };
}

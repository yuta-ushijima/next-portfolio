const Blog = (props) => {
  console.log(props);
  return <h1>ブログページ</h1>;
};
export default Blog;

export async function getStaticProps() {
  const testText = "Next.jsポートフォリオ";

  return {
    props: {
      test: testText,
    },
  };
}

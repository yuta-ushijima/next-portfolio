const SingleBlog = () => {
  return <h1>記事ページ</h1>;
};

export default SingleBlog;

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys;
    const values = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/).slice(0, -3);
      return slug;
    });
    return data;
  })(require.context("../data", true, /\.md$/));

  const paths = blogSlugs.map((blogSlug) => `/blog/${blogSlug}`);

  return {
    paths: paths,
    fallback: false,
  };
}

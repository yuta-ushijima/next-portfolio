import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Image from "next/dist/client/image";

const SingleBlog = (props) => {
  return (
    <>
      <div>
        <Image
          src={props.frontmatter.image}
          alt="blog-image"
          height="500"
          width="1000"
        />
      </div>
      <div>
        <div>
          <h1>{props.frontmatter.title}</h1>
          <p>{props.frontmatter.date}</p>
          <ReactMarkdown children={props.markdownBody}></ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      return slug;
    });
    return data;
  })(require.context("../../data", true, /\.md$/));

  const paths = blogSlugs.map((blogSlug) => `/blog/${blogSlug}`);
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const data = await import(`../../data/${slug}.md`);
  const singleDocument = matter(data.default);
  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
    },
  };
}

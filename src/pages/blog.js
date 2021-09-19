import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import * as style from "../styles/blog.module.scss";

const Blog = (props) => {
  console.log(props);
  return (
    <Layout>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {props.blogs.map((blog, index) => (
            <div key={index}>
              <div>
                <h3>{blog.frontmatter.title}</h3>
                <p>{blog.frontmatter.date}</p>
                <Link href={`/blog/${blog.slug}`}>
                  <a>Read More</a>
                </Link>
              </div>
              <div className={style.cardImage}>
                <Image
                  src={blog.frontmatter.image}
                  alt="card-image"
                  height={300}
                  width={300}
                  quality={90}
                ></Image>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
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

  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id;
  });
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(orderedBlogs)),
    },
  };
}

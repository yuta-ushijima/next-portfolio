import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";
import * as style from "../styles/blog.module.scss";
import Seo from "../components/seo";
import { getAllBlogs } from "../utils/mdQueries";

const Blog = ({blogs}) => {
  return (
    <Layout>
      <Seo title="ブログ" description="これはブログページです" />
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {blogs.map((blog, index) => {
            const { title, date, except, image } = blog.frontmatter
            return(
            <div key={index}>
              <div>
                <h3>{title}</h3>
                <p>{except}</p>
                <p>{date}</p>
                <Link href={`/blog/${blog.slug}`}>
                  <a>Read More</a>
                </Link>
              </div>
              <div className={style.cardImage}>
                <Image src={image} alt="card-image" height={300} width={300} quality={90} />
              </div>
            </div>
            )}
          )}
        </div>
      </div>
    </Layout>
  );
};
export default Blog;

export async function getStaticProps() {
  const { orderedBlogs } = await getAllBlogs()

  return {
    props: {
      blogs: orderedBlogs,
    },
  };
}

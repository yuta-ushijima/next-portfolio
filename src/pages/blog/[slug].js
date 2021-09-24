import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import * as style from "../../styles/singleBlog.module.scss";
import Seo from "../../components/seo";
import { getAllBlogs, getSingleBlog } from "../../utils/mdQueries";
import PrevNext from "../../components/prevNext";

const SingleBlog = ({frontmatter, markdownBody, prev, next}) => {
  const { title, date, except, image} = frontmatter
  return (
    <Layout>
      <Seo title={title} description={except} />
      <div className={style.hero}>
        <Image
          src={image}
          alt="blog-image"
          height="500"
          width="1000"
        />
      </div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>{title}</h1>
          <p>{date}</p>
          <ReactMarkdown children={markdownBody} />
        </div>
        <PrevNext prev={prev} next={next} />
      </div>
    </Layout>
  );
};

export default SingleBlog;

export async function getStaticPaths() {
  const { orderedBlogs } = await getAllBlogs()
  const paths = orderedBlogs.map((orderedBlog) => `/blog/${orderedBlog.slug}`);

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { singleDocument } = await getSingleBlog(context)
  const { orderedBlogs} = await getAllBlogs()

  const prev = orderedBlogs.filter(orderedBlogs => orderedBlogs.frontmatter.id === singleDocument.data.id -1)
  const next = orderedBlogs.filter(orderedBlogs => orderedBlogs.frontmatter.id === singleDocument.data.id +1)

  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
      prev: prev,
      next: next,
    },
  };
}

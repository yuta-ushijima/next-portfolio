import Link from "next/dist/client/link";

const Footer = () => {
  return (
    <footer>
      <div>
        <a href="https://www.google.com/">
          <img src="/images/github.svg"></img>
        </a>
        <a href="https://www.google.com/">
          <img src="/images/linkedin.svg"></img>
        </a>
        <a href="https://www.google.com/">
          <img src="/images/twitter.svg"></img>
        </a>
        <a href="https://www.google.com/">
          <img src="/images/facebook.svg"></img>
        </a>
        <hr />
        <Link href="/blog">
          <a>Blog</a>
        </Link>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
        <p>©︎{new Date().getFullYear()} Abe Hiroki</p>
      </div>
    </footer>
  );
};

export default Footer;

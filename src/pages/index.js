import Link from "next/link";
import * as style from "../styles/index.module.css";

const Index = () => {
  return (
    <div>
      <h1 className={style.h1Text}>こんにちは</h1>
      <Link href="/contact">
        <a>Contactページへ移動</a>
      </Link>
    </div>
  );
};
export default Index;

import {memo} from 'react'
import style from "./Loader.module.css";

const Loader = memo(() => {
  return <span className={style.loader}></span>;
});

export default Loader;

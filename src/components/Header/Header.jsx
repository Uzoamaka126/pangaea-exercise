import {memo} from 'react'
import style from "./Header.module.css";

const Header = memo(() => {
  return (
    <div className={style.header}>
      <div className="container d-flex justify-space-between align-end">
        <div className={style.headerFlex}>
          <div>
            <h1 className={style.title}>All Products</h1>
            <p className={style.description}>A 360° look at Lumin</p>
          </div>
          <div className={style.dropdown}>
            <select name="" id="">
              <option value="Filter By">Filter By</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Header;

import { Outlet, useNavigate } from "react-router-dom";
import classes from "./Layout.module.css";

function Layout() {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>Logo</h1>
      </header>
      <div className={classes.content}>
        <nav className={classes.nav}>
          <ul>
            <li onClick={() => handleRedirect("/")}>
              <div className={`${classes.circle}`}></div>
              <span>Exams</span>
            </li>
            <li>
              <div className={`${classes.circle}`}></div>
              <span>Students</span>
            </li>
          </ul>
        </nav>
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

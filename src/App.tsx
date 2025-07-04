import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import useOsInfoStore from "./store/OsInfoStore";
import MenuBar from "./components/menuBar/MenuBar";
import useThemeStore from "./store/ThemeStore";

function App() {
  const dark = useThemeStore((state) => state.dark);
  const setDark = useThemeStore((state) => state.setDark);
  const detectOS = useOsInfoStore((state) => state.detectMobileOS);
  const isMobileOS = useOsInfoStore((state) => state.isMobileOS);
  const osFetched = useOsInfoStore((state) => state.osFetched);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDark(true);
  }, [setDark]);

  useEffect(() => {
    if (!osFetched) {
      detectOS();
    }
  }, [osFetched]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div
      className="grid min-h-screen
     bg-white text-black dark:bg-zinc-900
      dark:text-white transition-colors pt-10
      max-h-[100vh] custom-scrollbar select-none
      "
    >
      {!isMobileOS && <MenuBar />}
      <Outlet />
      <h1>{`${osFetched}`}</h1>
    </div>
  );
}

export default App;

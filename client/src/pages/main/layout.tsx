import { Outlet } from "react-router";
import { Footer, Header } from "../../components";

export const LayoutMain = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};
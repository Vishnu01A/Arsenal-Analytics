import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopNavbar />
      <div style={{ display: "flex" }}>
        <LeftSidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;

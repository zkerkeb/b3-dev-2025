import { Outlet } from "react-router";



function Layout() {
  return (
    <div>
    <h1>PokeDex Header</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
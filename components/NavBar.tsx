const NavBar = () => {
  return (
    <nav className="absolute bg-transparent  z-10 top-0  h-20 flex justify-between items-center  px-10 mx-auto w-full">
      <div className=" flex-1">
        <div className="text-white text-4xl font-light tracking-[3.60px] uppercase">
          Neil Whitlock
        </div>
      </div>
      <div className="flex flex-1 w-full justify-end">
        <ul className="uppercase flex text-white gap-5">
          <li>Home</li>
          <li>Gallery</li>
          <li>About</li>
          <li>Print</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

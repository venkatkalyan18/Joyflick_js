import React from "react";
import { Link } from "react-router-dom"; 
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"; // Ensure the correct import path
import Menu from "../assets/menu.svg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-12 max-md:px-8 bg-black text-white font-mono">
      <div>
        <h1 className="text-2xl">Joy Flick</h1>
      </div>

      <div className="hidden md:block">
        <ul className="flex items-center gap-20 text-xl mr-14">
          <li>
            <Link to="/">Home</Link> {/* Use Link from react-router-dom */}
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/">Help</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <img
              src={Menu}
              width={24}
              height={24}
              alt="Menu img"
              className="brightness-0 invert mr-2 text-center"
            />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-10 bg-white md:hidden font-mono w-[300px]"> {/* Reduced Width */}
            <SheetHeader>
              <SheetTitle className="text-2xl font-mono mb-4">Joy Flick</SheetTitle>
              <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-xl">
                <li>
                  <Link to="/" className="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/games" className="">
                    Games
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    Help
                  </Link>
                </li>
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;

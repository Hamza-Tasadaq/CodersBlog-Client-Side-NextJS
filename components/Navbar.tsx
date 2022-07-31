import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-6 sticky top-0 left-0 bg-white flex justify-between items-center">
      <Link href={"/"}>
        <div className="flex items-center cursor-pointer">
          <Image src={"/logo.png"} width={40} height={35} />
          <span className="font-bold ml-2 text-primary">Coder's Blog</span>
        </div>
      </Link>
      {/* <ul className="flex items-center">
        <li className="mr-6 font-medium text-gray-600">
          <a href="#">Products</a>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <a href="#">pricing</a>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <a href="#">Docs</a>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <a href="#">Company</a>
        </li>
      </ul>
      <ul className="flex items-center">
        <li className="mr-6 font-medium text-gray-600">
          <a href="#" className="hover:text-gray-400">
            Log in
          </a>
        </li>
        <li className="font-medium text-gray-600">
          <a
            href="#"
            className="bg-primary py-2 px-4 rounded-sm text-white hover:bg-primary-dark transition-all"
          >
            Sign up
          </a>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;

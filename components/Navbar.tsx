'use client'; // This is now a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const Navbar = () => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push('/auth/sign-in'); // Redirect to sign-in page
  };

  const handleSignUpClick = () => {
    router.push('/auth/sign-up'); // Redirect to sign-up page
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          MyApp {/* You can replace this with your logo */}
        </div>
        <div>
          <button
            className="text-white px-4 py-2 mr-4 bg-transparent border border-white rounded hover:bg-white hover:text-blue-500 transition duration-200"
            onClick={handleSignInClick}
          >
            Sign In
          </button>
          <button
            className="text-white px-4 py-2 bg-white text-blue-500 border border-white rounded hover:bg-transparent hover:text-white transition duration-200"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

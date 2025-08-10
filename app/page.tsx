"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      {user ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Welcome back, {user.fullName}!</h1>
          <p className="text-xl mb-8">Browse our products</p>
          <div className="space-x-4">
            <button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-6">Welcome to Home Stay</h1>
          <p className="text-xl mb-8">Find the Product</p>
          <div className="space-x-4">
            <Link href="/login" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link href="/register" className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
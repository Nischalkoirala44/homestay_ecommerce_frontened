export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} HomeStay store. All rights reserved.</p>
                </div>
            
        </footer>
    );
}
export default function Message({ children, avatar, username, description }) {
    return(
        <div className="bg-white p-8 rounded-lg drop-shadow-2xl my-4 z-0">
            <div className="flex items-center gap-2">
                <img src={avatar} className="w-12 rounded-full" alt="Photo" />
                <h2 className="text-base">{username}</h2>
            </div>
            <div className="py-4 mb-2 text-base text-gray-900">
                <p>{description}</p>
            </div>
            {children}
        </div>        
    );
}
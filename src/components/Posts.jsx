import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import './App.css'; // Make sure to import the CSS file

function Posts() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const readPost = (e) => {
        const postId = e.target.getAttribute('data-post-id');
        const userId = e.target.getAttribute('data-user-id');
        console.log(userId, postId);
        navigate(`/posts/${postId}`);
    }

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            await sleep(1000);
            setPosts(data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log('error occurred while fetching the posts', err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    let content;
    if (loading) {
        content = <>Loading...</>;
    } else if (error) {
        content = <>Error</>;
    } else {
        content = (
            posts.map((post) => (
                <div key={post.id} className="bg-black text-white p-8 m-10 w-[30vw] border-2 border-[#fecc70] movingBorders">
                    <h3>{post.title}</h3>
                    <p>{post.body.substr(0, 60)}</p>
                    <button
                        type="submit"
                        onClick={readPost}
                        data-post-id={post.id}
                        data-user-id={post.userId}
                    >
                        Read blog
                    </button>
                </div>
            ))
        );
    }

    return (
        <div className="mx-auto w-[80vw] flex sm:flex-col md:flex-row flex-wrap justify-between min-h-[100vh] border-2 border-white movingBorders">{content}</div>
    );
}

export default Posts;

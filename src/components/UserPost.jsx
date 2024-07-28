import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Comments from "./Comments";

function UserPost() {
    const { postId } = useParams()
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [comments, setComments] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [user, setUser] = useState(null)
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const handleComments = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data);
        setIsVisible(true)
    }
    const fetchData = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
            const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            const userData = await userResponse.json();
            if (userData) {
                setUser(userData);
            }
            await sleep(1000);
            setPost(data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
            console.log('error occurred while fetching the posts', err);
        }
    }
    useEffect(() => {
        fetchData();
    }, [postId])

    let content;
    if (loading) {
        content = <>Loading</>
    } else if (error) {
        content = <>error</>
    } else {
        content = <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>posted By: {user.name}</p>
            <button onClick={handleComments}>Show Comments</button>
            {
                comments && isVisible && <Comments comments={comments} isVisible={isVisible} setIsVisible={setIsVisible} />
            }
        </>
    }
    return (
        <div className="text-white">{content}</div>
    )
}

export default UserPost
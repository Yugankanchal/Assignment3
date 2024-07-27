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
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const handleComments = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data);
    }
    const fetchData = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
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


    // useEffect(() => {
    //     handleComments();
    // }, [comments])


    let content;
    if (loading) {
        content = <>Loading</>
    } else if (error) {
        content = <>error</>
    } else {
        content = <>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={handleComments}>Show Comments</button>
            {
                comments && <Comments comments={comments} />
            }
        </>
    }
    return (
        <div>{content}</div>
    )
}

export default UserPost
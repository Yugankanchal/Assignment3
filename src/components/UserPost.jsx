import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PostComments from './PostComments'
import { motion } from "framer-motion";



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
        async function handleTransition() {
            const body = document.querySelector('body');
            body.classList.add('pageTransition');

            try {
                // Await the fetchData function if it's asynchronous

                await fetchData();
                // Wait for 1 second
                await sleep(500);
            } catch (error) {
                console.error('Error during transition:', error);
            } finally {
                body.classList.remove('pageTransition');
                body.classList.add('pageUptransition');
                await sleep(500);

                body.classList.remove('pageUptransition');
            }

            console.log(body);
        }

        handleTransition();
    }, [postId]);

    let content;
    if (loading) {
        content = <>Loading</>
    } else if (error) {
        content = <>error</>
    } else {
        content = <motion.div initial={{ y: -100 }}
            whileInView={{ y: 0 }}>
            <img src="https://th.bing.com/th/id/OIP.55ULTLoXRwDVDcEZZoORMwHaHa?w=200&h=201&c=7&r=0&o=5&pid=1.7"
                className="rounded-[50%] w-[150px] m-10 h-[150px] border-2  border-purple-400" alt="" />
            <h2 className="text-3xl p-5">{post.title}</h2>
            <p className="text-2xl p-5">{post.body}</p>
            <p className="text-2xl p-5">posted By: {user.name}</p>
            <button onClick={handleComments} className="text-xl p-5 border-2 border-white rounded-lg m-5" >Show Comments</button>
            {
                comments && isVisible && <PostComments comments={comments} isVisible={isVisible} setIsVisible={setIsVisible} />
            }
        </motion.div>
    }
    return (
        <div

            className="text-white w-[90vw] md:w-[80vw] mx-auto movingBorders bg-[#0a1222]">{content}</div>
    )
}

export default UserPost
import { motion } from "framer-motion";
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
    }, []);
    let content;
    if (loading) {
        content = <>Loading...</>;
    } else if (error) {
        content = <>Error</>;
    } else {
        content = (
            posts.map((post) => (
                <motion.div
                    whileHover={{
                        scale: 1.15
                    }}
                    initial={{ opacity: 0, x: -50 }} // Initial state
                    whileInView={{ opacity: 0.8, x: 0 }}
                    transition={{
                        // duration: .5,
                        type: 'spring',  // Use the spring animation type
                        stiffness: 10,  // Stiffness of the spring (higher = more stiffness)
                        mass: 1
                    }}
                    key={post.id}
                    className="bg-black text-white p-8 m-10 w-[30vw] border-2 border-white movingBorders rounded-[2rem]">
                    <img src="https://th.bing.com/th/id/OIP.55ULTLoXRwDVDcEZZoORMwHaHa?w=200&h=201&c=7&r=0&o=5&pid=1.7" className="rounded-[50%] w-[100px] h-[100px] border-2 border-purple-400" alt="" />
                    <h3 className="text-3xl p-2">{post.title}</h3>
                    <p className="texxt-2xl p-2">{post.body.substr(0, 60)}</p>
                    <motion.button
                        className="border-2 border-white rounded-lg text-xl p-3"
                        type="submit"
                        initial={{ opacity: 0, x: "100%" }}
                        whileInView={{ opacity: .8, x: 0 }}
                        // transition={{ duration:  s}}
                        whileHover={{
                            backgroundColor: 'white', // Example valid color value
                            color: 'black',
                            scale: 1.12
                        }}

                        onClick={readPost}
                        data-post-id={post.id}
                        data-user-id={post.userId}
                    >
                        Read blog
                    </motion.button>
                </motion.div>
            ))
        );
    }

    return (
        <div className="mx-auto w-[80vw] flex sm:flex-col md:flex-row flex-wrap justify-between min-h-[100vh] border-2 border-white movingBorders">{content}</div>
    );
}

export default Posts;

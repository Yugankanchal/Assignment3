import { animate, motion } from 'framer-motion';
import PropTypes from 'prop-types';

function Comments({ comments, isVisible, setIsVisible }) {
    const hideComments = () => {
        setIsVisible(false);
    }
    return (
        <>
            {isVisible && <motion.section
                initial={{ x: -100 }}
                whileInView={{ x: 0, }}
                id='comment-section'
                className='border-t-2 border-white rounded-lg bg-[#040916] border-b-2 my-10'
            >
                <h2 className='text-center text-3xl my-10'>Comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className=''>
                        <p className='text-2xl p-5'> {comment.body}</p>
                    </div>
                ))}
                <motion.button
                    initial={{ x: '100%' }}
                    whileInView={{ x: 0 }}
                    // transition={{ duration: 1 }}
                    onClick={hideComments}
                    className="text-xl p-5 border-2 border-white rounded-lg m-5">Hide Comments</motion.button>
            </motion.section >}
        </>
    );
}
Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            postId: PropTypes.number,
            id: PropTypes.number,
            body: PropTypes.string,
            name: PropTypes.string,
            email: PropTypes.string,
        })
    ).isRequired
};

export default Comments;

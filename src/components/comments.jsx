import PropTypes from 'prop-types';
function Comments({ comments, isVisible, setIsVisible }) {
    const hideComments = () => {
        setIsVisible(false);
    }
    return (
        <>
            {isVisible && <section id='comment-section'>
                <h2>comments</h2>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.body}</p>
                    </div>
                ))}
                <button onClick={hideComments}>Hide Comments</button>
            </section>}
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

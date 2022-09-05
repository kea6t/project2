

const testCommentFunction = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#new-comment-text').value.trim();
    const potluck_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const user_id = sessionuser;
    if ( comment_text ) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, potluck_id, user_id }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add food!');
        }
    }

    //alert('this is working');
};



document.querySelector('.new-comment-form').addEventListener('submit', testCommentFunction);
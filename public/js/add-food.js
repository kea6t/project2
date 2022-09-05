

const testFunction = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#new-food-name').value.trim();
    const description = document.querySelector('#new-food-description').value.trim();
    const potluck_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    //const user_id = parseInt(sessionuser);
    const user_id = 1;
    //console.log(sessionuser);

    if (name && description) {
        const response = await fetch('/api/foods', {
            method: 'POST',
            body: JSON.stringify({ name, description, potluck_id, user_id }),
            headers: { 'Content-Type': 'application/json'},
        });
        console.log(response);

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add food!');
        }
    }

    //alert(name + '  ' + description);
};



document.querySelector('.new-food-form').addEventListener('submit', testFunction);
async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    if (1 === 1) {
      
    
      const response = await fetch(`/api/foods/${id}`, {
        method: 'DELETE'
      });

      
    }
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
    //alert('this is working');
  }
  
  document.getElementById('delete-btn').addEventListener('click', deleteFormHandler);
  
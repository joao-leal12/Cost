async function call(set){ 
    await fetch('http://localhost:5000/categories', {
        method :'GET', 
        headers: {
            'Content-type': 'application/json' 
        }
    })
    .then(response => response.json()) 
    .then(data => set(data) ); 
}   


export default call; 
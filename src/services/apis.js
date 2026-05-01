
const APIKEY= "live_aeOg4WuBlBnSrFyqj3qfncBjVWMvIn7uAjoVlKBPks8Lju6d7aKnhimQnCWJeUfF"
export const fetchingPets = async () => {
  const response = await fetch('https://api.thedogapi.com/openapi-json');
  const data = await response.json();
  return data; 
};


//==========

export const fetchStores = async() =>{

 fetch('https://petstore.swagger.io/v2/store/inventory')
  .then(response => response.json())
  .then(data => console.log(data));
}


//////

export const fetchBreeds = async () => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    return data; 
  } catch (error) {
    console.log("Fetch error:", error);
    
  }
};


///

export const fetchHealthTips = async () => {
  try {
const response = await fetch('https://dogapi.dog/api/v2/facts?limit=5', {      headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.data);

    return data.data; 
  } catch (error) {
    console.log("Fetch error:", error);
    
  }
};

///////

export const fetchUsers = async ()=>{
try{
  const response = await fetch("https://69f23f51b15130b97352bb16.mockapi.io/users/users")
 const data = await response.json();
  // console.log(data)
  return data
}catch (error) {
    console.log("Fetch error:", error);
    
  }

}

///////////////


export const fetchBreedsBYID = async (id) => {
  try {
const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`, {      headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.data);

    return data.data; 
  } catch (error) {
    console.log("Fetch error:", error);
    
  }
};
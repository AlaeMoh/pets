
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
// ✅ CORRECT: ../services/apis.js
export const fetchBreedsByID = async (id) => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const breeds = await response.json();
    
    const breed = breeds.find(b => String(b.id) === String(id));
    if (!breed) throw new Error(`Breed ${id} not found`);

    let image_url = null;
    
    if (breed.image?.url) {
      image_url = breed.image.url;
    } 
    else if (breed.reference_image_id) {
      image_url = `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
    } 
    else {
      try {
        const imgRes = await fetch(
          `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`,
          { headers: { 'x-api-key': APIKEY } }
        );
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          if (imgData[0]?.url) {
            image_url = imgData[0].url;
          }
        }
      } catch (e) {
        console.warn(`Could not fetch image for breed ${breed.id}`);
      }
    }

    return {
      ...breed,
      image_url: image_url || "https://via.placeholder.com/600x400?text=No+Image+Available"
    };

  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
/////

export const searchBreeds = async (searchTerm) => {
  try {
const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${searchTerm}`, {
  headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.data);

    return data; 
  } catch (error) {
    console.log("Fetch error:", error);
    return[];
  }
};


///////////


// In ../services/apis.js
// In ../services/apis.js

export const fetchBreedsAndImage = async () => {
  try {
    // Step 1: Fetch all breeds
    const breedsResponse = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key': APIKEY,
        'Content-Type': 'application/json'
      }
    });

    if (!breedsResponse.ok) throw new Error(`Error: ${breedsResponse.status}`);
    const breeds = await breedsResponse.json();

    // Step 2: Fetch images for breeds that don't have reference_image_id
    // We'll batch fetch images for all breeds (limit to avoid rate limits)
    const breedsWithImages = await Promise.all(
      breeds.map(async (breed) => {
        // If breed already has image via reference_image_id, use it
        if (breed.reference_image_id) {
          return {
            ...breed,
            image_url: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
          };
        }
        
        // Otherwise, try to fetch an image for this breed ID
        try {
          const imageResponse = await fetch(
            `https://api.thedogapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`,
            { headers: { 'x-api-key': APIKEY } }
          );
          
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            if (imageData[0]?.url) {
              return {
                ...breed,
                image_url: imageData[0].url
              };
            }
          }
        } catch (imgError) {
          // Silently fail - we'll use placeholder
          console.warn(`Could not fetch image for breed ${breed.id}`);
        }
        
        // Fallback to placeholder
        return {
          ...breed,
          image_url: "https://via.placeholder.com/400x350?text=No+Image"
        };
      })
    );

    return breedsWithImages;
    
  } catch (error) {
    console.log("Fetch error:", error);
    return [];
  }
};
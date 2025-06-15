import axios from "axios"

const BASE_URL="https://places.googleapis.com/v1/places:searchText"

const config={
    headers:{
        "Content-Type":"application/json",
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'


        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

export const imageurl="https://atvyyc.net/wp-content/uploads/2022/10/307489118_10166743919940511_8771939586354675560_n.jpg"

export const PLACEHOLDER_URL="https://static.vecteezy.com/system/resources/previews/027/161/616/non_2x/generative-ai-plane-fliing-over-a-tropical-island-with-palm-trees-travel-vacation-concept-beautiful-sky-background-free-photo.jpg"


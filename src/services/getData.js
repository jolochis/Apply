import axios from "axios";

const getItems = async(id) => {
    try {
        const items = await axios.get(`http://hn.algolia.com/api/v1/items/${id}`);
        return items
    } catch (error) {
        console.log(error)
    }   
}
const searchPage = async(page) => {
    try {
        const pages = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${page}`);
        return pages
    } catch (error) {
        console.log(error)
    }   
}

export {
    getItems,
    searchPage
}
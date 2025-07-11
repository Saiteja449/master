// export const API_BASE_URL = "https://cmschamps.com/petsfolio/api/"; // LIVEEEEEEEEEE
// export const API_BASE_URL = "https://cmschamps.com/petsfolio/beta/api/"; // TESTTTTTTTTTT
// export const API_BASE_URL = "https://petnpro.in/api/"; // HOSTINGERRRR TESTTTTTTTTTT
// export const API_BASE_URL = "https://petsfolio.in/api/"; // HOSTINGERRRR LIVEEEEEEEEEE
export const API_BASE_URL = "https://beta.petsfolio.in/api/"; // HOSTINGERRRR TESSSTTTTT

//git cheeckk local


export const formatDate = (date) => {
    const d = new Date(date); // Convert to Date object
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};
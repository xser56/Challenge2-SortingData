const fetchData = async () => 
{
    const response = await fetch("./data/data.json");
    const data = await response.json();
    console.log("Fetched data:", data.People); 
    return data.People; 
};

const grabData = async () => 
{
    const nameData = await fetchData();
    console.log("Stored nameData:", nameData); 
    return nameData;
};

export {grabData, fetchData}
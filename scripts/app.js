import { fetchData, grabData } from "./fetch.js";

const tableBody = document.getElementById("data-body");
const paginationList = document.getElementById("pagination");
const sortOption = document.getElementById("sort");

let nameData = [];
let currentPage = 1;
let itemsPerPage = 10;
let sortedBy = "Id";

// Display Main Data
const displayData = () => 
{
    if (!nameData.length) 
    {
        console.log("name: no data"); 
        return;
    }

    if (!tableBody) 
    {
        console.log("table: no data");
        return;
    }

    tableBody.innerHTML = "";

    let sortedData = [...nameData];
    
    // List sort
    if (sortedBy === "Id" || sortedBy === "Age") 
    {
        sortedData.sort((a, b) => a[sortedBy] - b[sortedBy]);
    } else 
    {
        sortedData.sort((a, b) => a[sortedBy].toString().localeCompare(b[sortedBy]));
    }

    // pages logic (1-50)
    let start = (currentPage - 1) * itemsPerPage;
    let paginatedData = sortedData.slice(start, start + itemsPerPage);
    console.log("Paginated data:", paginatedData);

    const fragment = document.createDocumentFragment();

    paginatedData.forEach(person => 
    {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${person.Id}</td>
            <td>${person.FirstName}</td>
            <td>${person.LastName}</td>
            <td>${person.Height}</td>
            <td>${person.Age}</td>
        `;
        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
};

// Event listeners
document.addEventListener("DOMContentLoaded", async () => 
{
    // Fetch thy Data
    nameData = await grabData();
    displayData();
});

// Pag list
paginationList.addEventListener("change", (e) => 
{
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    displayData();
});

// Drop down
sortOption.addEventListener("change", (e) => {
    sortedBy = e.target.value;
    displayData();
});

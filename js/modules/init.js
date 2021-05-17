export {getUsers};


async function getUsers() {
    let url = 'data/employees.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}




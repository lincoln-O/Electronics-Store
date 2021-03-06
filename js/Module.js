const productdb = (dbname, table) => {

    //create database
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
    // const db = new Dexie('myDb');
    // db.version(1).stores({
    //     friends:`name, age`
    // })
    return db;
}

// insert function
const bulkcreate = (dbtable,data) => {
    let flag = empty(data);
    if(flag){
        dbtable.bulkAdd([data]);
        console.log("Data inserted successfully!")
    } else {
        console.log("Please provide product details; eg. seller, price etc")
    }
    return flag;
}

// check text box validation
const empty = object =>{
    let flag = false;

    for(const value in object){
        if(object[value] != " " && object.hasOwnProperty(value)){
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

// getting the data from the db
const getData = (dbname, fn) =>{
    let index = 0;
    let obj = {};

    dbname.count((count) => {
        // count rows using count method
        if(count){
            dbname.each(table => {
               obj = Sortobj(table);
               fn(obj, index++);
            });
        } else {
            fn(0);
        }
    })
}

// sorting the data
const Sortobj = (sortobj) => {
    let obj = {};
    obj = {
        id:sortobj.id,
        name:sortobj.name,
        seller:sortobj.seller,
        price:sortobj.price
    }
    return obj;
}

// dynamically display table
const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if(appendTo) appendTo.appendChild(element);
    if(fn) fn(element);
}


export default productdb;
export{
    bulkcreate,
    getData,
    createEle,
    Sortobj
}
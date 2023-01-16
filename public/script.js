const inputToDo = document.getElementById("toDoInput");
const submitButton = document.getElementById("submitToDo");
const toDoList = document.getElementById("toDoList");

const getToDos = () => {
    fetch("/toDos")
        .then(res => res.json())
        .then(data => {

            [{ label: "intial list", "id": 1}]
            if (data.toDos) {

                data.toDos.forEach(toDo => {


                    const li = document.createElement('li');
                    const addButton = document.createElement('button');
                    const deleteButton = document.createElement('button');
                })
            }
        })
};

const deleteToDos = (id) => {

    fetch("/toDos", {
        method:"POST",
        body:JSON.stringify({id})

    })
}

const deleteToDoData = {

    id: id
}
fetch("/toDos", {

    method:"POST",
    "Content-Type":"application/json",
    body: JSON.stringify(deleteToDoData)
})
.then(res=>res.json())

.then(data=> {

    toDoList.innerHTML=""
    toDoList.id="toDoList"
    data.toDos.forEach(toDo =>{

        const li =document.createElement('li');
        li.text = toDo.label;
        const deleteButton = document.createElement('button');

        deleteButton.addEventListener('click'), () => {

            deleteToDos(toDo.id)
        }
    })
})

getToDos();
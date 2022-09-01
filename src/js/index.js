const todoList = './todoList.json';

const fs = require('fs');

const writeFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(todoList, JSON.stringify(data), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve("Succesfully insert data");
      }
    })
  })
}


// write data todo nanti disini
const writeData = async (data) => {
  try {
    const todoList = await readAllFile();
    data.id = slugify(data.todo, { replacement: '_', lower: true });
    const newData = [...todoList, data];
    const addToFile = await writeFile(newData)
  } catch (error){
    console.log(error)
  }
};


const readOneFile = async (todo, file) => {
  try {
    const data = await readAllFile(file);
    console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].todo === todo) {
        console.log('\ndata found :');
        console.log(`id: ${data[i].id}`, `todo: ${data[i].todo}`, `status: ${data[i].status == false ? "pending" : "done"}`)
        break;
      }
    }
  } catch (e) {
    console.log(e)
  }
}


const readAllFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

// update status dari false (pending) menjadi true (done)
const updateFile = async (todo, file) => {
  try {
    const data = await readAllFile(file);
    console.log('data', data);
    const updateStatus = data.map(todos => {
      let update = {...todos}
      if(todos.todo == todo){
        update.status = "true"
      }
      return update
    })
    console.log('\nstatus updated successfully');
    const addToFile = await writeFile(updateStatus);
    console.log(updateStatus)
  } catch (e) {
    console.log(e)
  }
}

const deleteOneData = async () => {

}


// updateFile('jemput adik', todoList)
readOneFile('belajar JS', todoList);
// writeData({ todo: 'jemput adik', status: false })
// readAllFile(todoList)


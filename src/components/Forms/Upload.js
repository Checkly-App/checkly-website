//  //upload 
//  const uploadFile = (file) =>  {
//     if (!file) return;

//     const storageRef = ref(storage, `Companies/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);
// };

// // const formHandler = (e) => {
// //   e.preventDefault();
// //   const file = e.target[0].files[0];
// //   console.log(file.name);
// //   //uploadFile(file);
// // };
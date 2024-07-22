import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";



const upload = async (file) =>{

    const date = new Date()
    const storageRef = ref(storage, 'images/${date + file.name}');

    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((reject,resolve)=>{ 

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                        reject("Somehting went wrong!"+error.code)
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL)
                        });
                    }
                );
                
            });
};

export default upload
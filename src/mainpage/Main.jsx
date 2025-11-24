import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import style from './main.module.css'

import choco from '../assets/choco.jpg'



const Main = () => {
  const [chocolate_name, setchocolate_name] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [time, settime] = useState('')
  const [error, seterrror] = useState({})

  const [tasks, settasks] = useState([])
  const [editId, setEditId] = useState(null)   // <-- NEW: store id of item being edited
  const [search, setSearch] = useState("");


  const validate = () => {
    const newErr = {}
    if (!chocolate_name.trim()) {
      newErr.chocolate_name = 'This is a required field'
    }
    if (!description.trim()) {
      newErr.description = 'This is a required field'
    }
    if (!price.trim()) {
      newErr.price = 'This is a required field'
    }
    seterrror(newErr)
    return Object.keys(newErr).length === 0
  }

  // get data
  // const fetchdata = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/api/get/");
  //     settasks(response.data)
  //   }
  //   catch {
  //     console.log("something went wrong")
  //   }
  // }


  // get data with filter
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/getlist/?chocolate_name=${search}`
      );

      console.log("GET RESPONSE:", response.data);


      settasks(response.data.products);

    } catch (error) {
      console.log("Fetch error");
    }
  };




  useEffect(() => {
    fetchdata();  // initial load
  }, []);

  useEffect(() => {
    fetchdata();  // run when search changes
  }, [search]);

  // create data
  const handleAdd = async () => {
    if (validate()) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/createchoco/", { "chocolate_name": chocolate_name, "description": description, "price": price, "status": true, "time": "" });
        fetchdata();
        setchocolate_name("");
        setdescription("");
        setprice("");

      }
      catch (err) {
        console.log("something went wrong")


      }
    }
  }
  // LOAD DATA INTO INPUTS FOR EDITING
  const handleEdit = (item) => {
    setEditId(item.id)
    setchocolate_name(item.chocolate_name)
    setdescription(item.description)
    setprice(item.price)
  }

  // UPDATE DATA
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      await axios.put(`http://127.0.0.1:8000/api/update/${editId}/`, {
        chocolate_name,
        description,
        price,
        status: true,
        time: ""
      });
      fetchdata();
      // 🔥 RESET FIELDS AFTER UPDATE
      setEditId(null);
      setchocolate_name("");
      setdescription("");
      setprice("");

    } catch (err) {
      console.log("update error")
    }
  }
  // DELETE DATA
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`);
      fetchdata();
    } catch (err) {
      console.log("delete error")
    }
  }


  return (
    <div className={style.App}>


      <div className={style.container}>
        <div>
          <h1>CHOCOLATE LIST</h1>
        </div>

        <div className={style.form}>
          <input type='text' value={chocolate_name} onChange={(e) => setchocolate_name(e.target.value)} placeholder='Enter chocolate name' />
          <p >{error.chocolate_name}</p>
          <input type='text' value={description} onChange={(e) => setdescription(e.target.value)} placeholder='Enter Description' />
          <p>{error.description}</p>
          <input type='text' value={price} onChange={(e) => setprice(e.target.value)} placeholder='Enter Price' />
          <p>{error.price}</p>



          {editId ? (
            <button onClick={handleUpdate}>UPDATE</button>
          ) : (
            <button onClick={handleAdd}>ADD</button>
          )}


          <input type='search' placeholder='Enter chocolates name here... ' onChange={(e) => setSearch(e.target.value)} />
          {/* <button onClick={fetchdata}>SEARCH</button> */}




        </div>


        <div className={style.listmain}>
          <ol className={style.list}>
            {
              tasks.map((item, index) => (
                <li>
                  <p>CHOCOLATE NAME:{item.chocolate_name}</p>
                  <p>DESCRIPTION:{item.description}</p>
                  <p>PRICE:{item.price}</p>
                  <p>TIME:{item.time}</p>
                  <div className={style.btn}>
                    <button onClick={() => handleEdit(item)}>EDIT</button>
                    <button onClick={() => handleDelete(item.id)}>DELETE</button>
                  </div>


                </li>



              ))
            }
          </ol>
        </div>
      </div>

    </div>
  );

}

export default Main
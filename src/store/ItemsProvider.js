import itemsContext from "./items-context";
import React, { useContext, useState, useEffect } from "react";
import api from "../api/meals";

export function ItemsProvider({ children }) {
  const [itemsData, setItemsData] = useState([]);
  const [switchPage, setSwitchPage] = useState("users");

  // get data from api and display it
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get("/meals");
      setItemsData(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers);
      } else {
        console.error(`Error: ${err.message}`);
      }
    }
  };

  // addNewItem
  const addNewItem = async (item) => {
    // console.log("addNewItem", item);
    try {
      const request = { ...item };
      const response = await api.post("/meals", request);
      setItemsData([...itemsData, response.data]);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // removeItem
  const removeItem = async (id) => {
    // console.log("removeItem", id);
    try {
      await api.delete(`/meals/${id}`);
      const newMeals = itemsData.filter((meal) => meal.id !== id);
      setItemsData(newMeals);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  // updateItem
  const updateItem = async (id, updatedItem) => {
    try {
      const response = await api.put(`/meals/${id}`, updatedItem);
      const updatedData = itemsData.map((item) =>
        item.id === id ? { ...response.data } : item
      );
      setItemsData(updatedData);
      // console.log("Item updated successfully");
    } catch (error) {
      console.error(`Error updating item: ${error.message}`);
    }
  };

  // togglePage
  const togglePage = () => {
    setSwitchPage((prevState) => !prevState);
  };

  // VALUE
  const value = {
    itemsData,
    switchPage,
    addNewItem,
    removeItem,
    updateItem,
    togglePage,
  };

  return (
    <itemsContext.Provider value={value}>{children}</itemsContext.Provider>
  );
}

export function useItemsCrud() {
  return useContext(itemsContext);
}

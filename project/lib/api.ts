"use client";
//API helper functions
const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";
const API_KEY = "yum-HipRojQEq5sRjt3s";
const TENANT_ID = "isabelle";

// Function to post an order
async function postOrder(itemIds: number[]) {
  try {
    const response = await fetch(`${BASE_URL}/${TENANT_ID}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-zocom": API_KEY,
      },
      body: JSON.stringify({ items: itemIds }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit order");
    }

    const data = await response.json();
    console.log("Order submitted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
}
export { postOrder };

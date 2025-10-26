import * as credentials from "../utils/credentials.json"
import { test, expect } from "@playwright/test";

export function generateBooking() {
  return {
    firstname: "Maria",
    lastname: "Silva",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2025-01-01",
      checkout: "2025-01-10",
    },
    additionalneeds: "Breakfast",
  };
}

export async function getToken(){
  

}

export function getBookingId(){

}
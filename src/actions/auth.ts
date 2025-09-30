"use server";
import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
  console.log(data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // if (!res?.ok) {
  //   console.error("Login Failed", await res.text());
  // }
  // return await res.json();
  const result = await res.json();
  console.log(result);
  return result;
};

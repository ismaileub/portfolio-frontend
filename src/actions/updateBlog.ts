"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const updateBlog = async (
  blogId: string,
  data: FormData,
  token: string
) => {
  const blogInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(modifiedData),
      credentials: "include",
    }
  );

  const result = await res.json();

  if (result?._id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    redirect("/blogs");
  }

  return result;
};

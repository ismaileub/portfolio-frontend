"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createProject = async (data: FormData, token: string) => {
  const session = await getUserSession();

  const projectInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...projectInfo,
    features: projectInfo.features
      ? projectInfo.features
          .toString()
          .split(",")
          .map((f) => f.trim())
      : [],
    technologies: projectInfo.technologies
      ? projectInfo.technologies
          .toString()
          .split(",")
          .map((t) => t.trim())
      : [],
  };

  console.log(modifiedData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(modifiedData),
    credentials: "include",
  });

  const result = await res.json();
  console.log("console forn server", result);

  if (result?._id) {
    revalidateTag("PROJECT");
    revalidatePath("/project-showcase");
    // redirect("/project-showcase");
    redirect("/project-showcase?status=success");
  }

  return result;
};

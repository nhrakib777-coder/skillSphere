import AllCourses from "./AllCourses";

export default async function Page() {
  // simulate loading (for testing)
  await new Promise((res) => setTimeout(res, 2000));

  return <AllCourses />;
}
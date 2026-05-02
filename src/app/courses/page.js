import { Suspense } from "react";
import AllCourses from "./AllCourses";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <AllCourses />
    </Suspense>
  );
}
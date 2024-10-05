import { notFound } from "next/navigation";

export default function Page() {
  // Since we're not implementing a blog, we'll just return a 404
  notFound();
}

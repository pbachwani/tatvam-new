import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center">
      <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
        This is home
      </div>
      <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
        This is section 1
      </div>
      <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
        This is section 2
      </div>
      <div className="h-screen border-2 border-amber-100 flex justify-center items-center">
        This is section 3
      </div>
    </main>
  );
}

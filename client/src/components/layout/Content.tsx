import Navbar from "../navbar/Navbar";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col flex-1 w-full h-full overflow-auto">
        <Navbar />

        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {children}
      </div>
    </div>
  );
};

export default MainContent;

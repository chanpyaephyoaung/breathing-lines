const BorderBox = ({ children }) => {
   return (
      <div className="w-full max-w-[400px] mx-auto p-4 md:p-6 border border-1 border-clr-black">
         {children}
      </div>
   );
};
export default BorderBox;

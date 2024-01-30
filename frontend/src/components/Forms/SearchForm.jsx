const SearchForm = () => {
   return (
      <form>
         <label className="relative text-xs grid justify-items-start gap-y-2">
            <span className="sr-only">search</span>
            <div className="justify-self-stretch relative">
               <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5 text-clr-black-faded"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                     />
                  </svg>
               </span>

               <input
                  className={`placeholder:text-clr-bg-faded text-xs md:text-base py-2 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                  placeholder="search for a poem..."
                  type="text"
                  name="search"
               />
            </div>
         </label>
      </form>
   );
};
export default SearchForm;

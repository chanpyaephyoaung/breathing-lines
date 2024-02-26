const Message = ({ type, children }) => {
   let markup = "";

   if (type === "danger") {
      markup = (
         <span className="text-clr-primary font-regular text-xs md:text-base">{children}</span>
      );
   } else if (type === "success") {
      markup = <span className="text-clr-black font-regular text-xs md:text-base">{children}</span>;
   }

   return markup;
};
export default Message;

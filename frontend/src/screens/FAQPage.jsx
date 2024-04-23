import Container from "../components/UI/Container.jsx";

const FAQPage = () => {
   return (
      <>
         <Container>
            <div className="grid gap-y-6 gap-x-4 items-center">
               <h2 className="text-lg md:text-2xl font-bold text-clr-black">FAQ</h2>
               <div className="grid gap-y-2">
                  <h3 className="text-base md:text-lg font-medium text-clr-black">
                     What is BreathingLines?
                  </h3>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     BreathingLines is a social web application designed exclusively to tailor the
                     needs of poetry enthusiasts in the form of a user-friendly platform to explore,
                     interact and catalogue poems. In an era dominated by mainstream social media
                     and visuals, BreathingLines offers a unique dedicated space where poetry takes
                     centre stage, encouraging poets and readers alike to forge meaningful
                     connections while fostering a profound appreciation for the harmonious display
                     of art and literature – poetry.
                  </p>
               </div>
               <div className="grid gap-y-2">
                  <h3 className="text-base md:text-lg font-medium text-clr-black">
                     How do I register for BreathingLines?
                  </h3>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     {`Signing up for BreathingLines is easy! Simply click on the "Sign Up" link on the login page, fill out the required information, and you're ready to start exploring poetry and connecting with other poetry enthusiasts.`}
                  </p>
               </div>
               <div className="grid gap-y-2">
                  <h3 className="text-base md:text-lg font-medium text-clr-black">
                     Can I share my own poetry on BreathingLines?
                  </h3>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     {`Absolutely! BreathingLines provides a platform for poets to share their own original poetry with a community of like-minded individuals. You can easily upload your poems, add tags, and interact with other users' poems through likes, comments, and more.`}
                  </p>
               </div>
               <div className="grid gap-y-2">
                  <h3 className="text-base md:text-lg font-medium text-clr-black">
                     Is BreathingLines free to use?
                  </h3>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     {`Yes, BreathingLines is absolutely free to use. You can sign up, explore poems, interact with other users, and enjoy all the features of the platform without any cost.`}
                  </p>
               </div>
               <div className="grid gap-y-2">
                  <h3 className="text-base md:text-lg font-medium text-clr-black">
                     Can I connect with other users on BreathingLines?
                  </h3>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     {`Yes, BreathingLines encourages community engagement and connection. You can follow other users, engage with their poems through comments and likes, and even message them directly to discuss poetry, collaborate on projects, or simply connect with like-minded individuals.`}
                  </p>
               </div>
            </div>
         </Container>
      </>
   );
};
export default FAQPage;

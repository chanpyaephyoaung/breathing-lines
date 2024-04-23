import Container from "../components/UI/Container.jsx";

const AboutPage = () => {
   return (
      <>
         <Container>
            <div className="grid gap-y-6 gap-x-4 items-center">
               <h2 className="text-lg md:text-2xl font-bold text-clr-black">About</h2>
               <div className="grid gap-y-4">
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     BreathingLines is a social web application designed exclusively to tailor the
                     needs of poetry enthusiasts in the form of a user-friendly platform to explore,
                     interact and catalogue poems. In an era dominated by mainstream social media
                     and visuals, BreathingLines offers a unique dedicated space where poetry takes
                     centre stage, encouraging poets and readers alike to forge meaningful
                     connections while fostering a profound appreciation for the harmonious display
                     of art and literature – poetry.
                  </p>
                  <p className="text-xs md:text-sm text-clr-black font-light text-justify">
                     At BreathingLines, we prioritize the protection of your personal data in
                     accordance with the key principles outlined in Article 5 of the GDPR
                     legislation. Upholding the first principle of lawfulness, fairness, and
                     transparency, we are committed to ensuring that your data processing practices
                     are conducted with utmost integrity. To achieve this, we provide our users with
                     a clear and concise privacy policy that outlines how their data will be
                     collected, stored, and used. We believe in transparency and strive to ensure
                     that you have a comprehensive understanding of how your information is handled
                     within our platform. Your privacy and trust are of paramount importance to us,
                     and we are dedicated to maintaining the highest standards of data protection to
                     safeguard your personal information.
                  </p>
               </div>
            </div>
         </Container>
      </>
   );
};
export default AboutPage;

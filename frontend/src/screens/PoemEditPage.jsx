import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import FormContainer from "../components/UI/FormContainer.jsx";
import LoaderSpinner from "../components/UI/LoaderSpinner.jsx";
import {
   useEditPoemMutation,
   useUploadPoemCoverImageMutation,
   useGetSinglePoemByIdQuery,
} from "../slices/poemsApiSlice.js";
import { toast } from "react-toastify";
import Message from "../components/Typography/Message.jsx";
import Modal from "../components/UI/Modal.jsx";
import SelectListBox from "../components/UI/SelectListBox.jsx";
import { bgThemes } from "../constants.js";

const PoemEditPage = () => {
   const { poemId } = useParams();
   const navigate = useNavigate();

   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [coverImg, setCoverImg] = useState("");
   const [genres, setGenres] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ctaType, setCtaType] = useState("");
   const [modalDesc, setModalDesc] = useState("");
   const [selectedBgTheme, setSelectedBgTheme] = useState(bgThemes[0]);

   const onChangeSelectedBgTheme = (bgTheme) => {
      setSelectedBgTheme(bgTheme);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const openModal = () => {
      setIsModalOpen(true);
   };

   const discardHandler = () => {
      setCtaType("discard");
      setModalDesc("Do you really wish to discard the changes?");
      openModal();
   };

   const saveChangesHandler = () => {
      setCtaType("saveChanges");
      setModalDesc("Do you really wish to save the changes?");
      openModal();
   };

   const ctaHandler = async () => {
      try {
         if (ctaType === "discard") {
            refetch();
         } else if (ctaType === "saveChanges") {
            const newPoemData = {
               title,
               content,
               bgTheme: selectedBgTheme,
               coverImg,
               genres,
            };
            await editPoem({
               poemId,
               newPoemData,
            }).unwrap();
            refetch();
            toast.success("Poem updated successfully!");
            closeModal();
         }
         navigate(`/poem/${poemId}`);
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   const [uploadPoemCoverImage, { isLoading: loadingUploadPoemCoverImage }] =
      useUploadPoemCoverImageMutation();

   const {
      data: poem,
      isLoading: isLoadingFetchingPoemData,
      error: errorFetchingPoemData,
      refetch,
   } = useGetSinglePoemByIdQuery(poemId);

   const [editPoem, { isLoading: loadingEditPoem }] = useEditPoemMutation();

   useEffect(() => {
      if (poem) {
         setTitle(poem?.title);
         setContent(poem?.content);
         setCoverImg(poem?.coverImg);
         setGenres(poem?.genres);
         setSelectedBgTheme(poem?.bgTheme);
      }
   }, [poem]);

   const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      try {
         const res = await uploadPoemCoverImage(formData).unwrap();
         toast.success(res.message);
         setCoverImg(res.result.fileKey);
      } catch (err) {
         toast.error(err?.data?.errMessage || err.error);
      }
   };

   return (
      <>
         {!loadingEditPoem && (
            <Modal
               isOpen={isModalOpen}
               closeModal={closeModal}
               desc={modalDesc}
               confirmBtnText="Confirm"
               successFunc={ctaHandler}
            />
         )}

         <FormContainer>
            {isLoadingFetchingPoemData || loadingEditPoem ? (
               <LoaderSpinner />
            ) : errorFetchingPoemData ? (
               <Message type="danger">
                  {errorFetchingPoemData?.data?.message || errorFetchingPoemData.error}
               </Message>
            ) : (
               <>
                  <h2
                     data-testid="heading"
                     className="text-lg md:text-2xl font-bold text-clr-black"
                  >
                     Edit a Poem!
                  </h2>

                  <form onSubmit={(e) => e.preventDefault} className="grid gap-6">
                     <label className="relative text-xs grid justify-items-start gap-y-2">
                        <span className="sr-only">Title</span>
                        <p className="text-base font-medium">Title</p>
                        <div className="justify-self-stretch relative">
                           <input
                              className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                              placeholder="title"
                              type="text"
                              name="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                           />
                        </div>
                     </label>

                     <div className="grid gap-y-2 text-left">
                        <span className="sr-only">Content</span>
                        <label htmlFor="about" className="block text-base font-medium">
                           Content
                        </label>

                        <textarea
                           id="about"
                           name="about"
                           rows={7}
                           className="py-3 pl-4 pr-4 placeholder:text-clr-black-faded block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-5"
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                     </div>

                     <div>
                        <label className="relative text-xs grid justify-items-start gap-y-2">
                           <span className="sr-only">cover image</span>
                           <div className="justify-self-stretch relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                 <PhotoIcon className="w-5 h-5 text-clr-black-faded" />
                              </span>

                              <input
                                 className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-8 md:pl-12 pr-3 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                                 placeholder="Enter cover image url"
                                 type="text"
                                 name="coverImg"
                                 value={coverImg}
                                 onChange={(e) => setCoverImg(e.target.value)}
                              />
                           </div>
                        </label>

                        <div className="relative text-xs grid justify-items-start gap-y-2">
                           <span className="sr-only">cover image</span>
                           <div className="justify-self-stretch relative">
                              <input
                                 className="block file:text-clr-white file:rounded file:border-0 file:py-3 file:px-6 file:mr-4 file:bg-clr-primary file:cursor-pointer text-clr-black-faded text-sm md:text-base pr-3 bg-clr-bg w-full border border-t-0 border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 cursor-pointer leading-none"
                                 label="Choose file"
                                 type="file"
                                 onChange={uploadFileHandler}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="grid gap-y-2 text-left">
                        <span className="sr-only">Background Pattern Theme</span>
                        <label htmlFor="about" className="block text-base font-medium">
                           Background Pattern Theme
                        </label>

                        <SelectListBox
                           selectedBgTheme={selectedBgTheme}
                           onChangeSelectedBgTheme={onChangeSelectedBgTheme}
                        />
                     </div>

                     <label className="relative text-xs grid justify-items-start gap-y-2">
                        <span className="sr-only">Genre Tags</span>
                        <p className="capitalize text-base font-medium">Genre Tags</p>
                        <div className="justify-self-stretch relative">
                           <input
                              className={`placeholder:text-clr-black-faded text-sm md:text-base py-3 md:py-3 pl-4 pr-4 block bg-clr-bg w-full border border-clr-black-faded rounded-lg focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 leading-none`}
                              placeholder="genre (e.g. love, nature)"
                              type="text"
                              name="genres"
                              value={genres}
                              onChange={(e) => setGenres(e.target.value)}
                           />
                        </div>
                     </label>

                     <div className="w-full justify-center flex gap-x-4">
                        <button
                           type="button"
                           onClick={discardHandler}
                           className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-black font-medium border border-clr-black rounded-lg hover:bg-clr-black hover:text-clr-white focus:outline-none focus:border-clr-black focus:ring-clr-black focus:ring-1 transition duration-300 leading-none"
                        >
                           Discard
                        </button>

                        <button
                           type="button"
                           onClick={saveChangesHandler}
                           className="text-xs py-2 px-5 md:text-base md:py-3 md:px-5 text-clr-primary font-medium border border-clr-primary rounded-lg hover:bg-clr-primary hover:text-clr-white focus:outline-none focus:border-clr-primary focus:ring-clr-primary focus:ring-1 transition duration-300 leading-none"
                        >
                           Save changes
                        </button>
                     </div>

                     {loadingUploadPoemCoverImage && <LoaderSpinner />}
                  </form>
               </>
            )}
         </FormContainer>
      </>
   );
};
export default PoemEditPage;

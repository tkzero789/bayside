import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { EditorContent, useEditor } from "@tiptap/react";
import { Toaster, toast } from "sonner";
import StarterKit from "@tiptap/starter-kit";
import Italic from "@tiptap/extension-italic";
import Image from "@tiptap/extension-image";
import axios from "axios";
import ConfirmModal from "components/UI/ConfirmModal";
import MenuBar from "components/Blog/MenuBar";
import "pages/Blog/Texteditor.scss";
import "pages/Blog/Blog.css";

const CreateBlog = ({ userInfos }) => {
  const userToken = localStorage.getItem("userToken");
  const apiConfig = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  // State for pop-up modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const [actionType, setActionType] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  // Show modal
  const handleShowModal = (event, actionType, title, body) => {
    event.preventDefault();
    setActionType(actionType);
    setModalContent({ title, body });
    setShowModal(true);
  };

  // Hide modal
  const handleHideModal = () => {
    setActionType(null);
    setModalContent({ title: "", body: "" });
    setShowModal(false);
  };

  let action;
  switch (actionType) {
    case "create":
      action = confirmCreate;
      break;
    default:
      action = null;
  }

  const navigate = useNavigate();

  // Create a ref for the file input
  const fileInputRef = useRef();

  // Format date
  const now = new Date();
  const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${String(now.getMonth() + 1).padStart(2, "0")}/${String(
    now.getDate()
  ).padStart(2, "0")}/${now.getFullYear()}`;

  // Blog state
  const [blog, setBlog] = useState({
    id: null,
    title: "",
    tag: "",
    intro: "",
    image: null,
    content: "",
    slug: "",
    author: userInfos.fullName,
    doctorID: userInfos.doctorID,
    createAt: null,
    status: "Pending Create",
  });

  // Text editor
  const editor = useEditor({
    extensions: [StarterKit, Italic, Image],
    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setBlog((prev) => ({
        ...prev,
        content: json,
      }));
    },
  });

  // Confirm create button
  async function confirmCreate() {
    let isSuccessful = false;

    if (blog.title === "") {
      window.alert("Please enter the title for this blog");
      return;
    } else if (blog.tag === "") {
      window.alert("Please select a tag for this blog");
      return;
    } else if (blog.intro === "") {
      window.alert("Please enter the intro");
      return;
    } else if (blog.image === null) {
      window.alert("Please select image(s) for this blog");
      return;
    } else if (blog.content === "") {
      window.alert("Please enter the content for this blog");
      return;
    }

    const updatedBlog = {
      ...blog,
      id: uuidv4(),
      createdAt: formattedTime,
    };

    try {
      await axios.post(
        "http://localhost:5000/blog/add",
        updatedBlog,
        apiConfig
      );
      setBlog(updatedBlog);
      isSuccessful = true;
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "A blog with this title already exists."
      ) {
        // Handle the specific case of a duplicate blog title
        alert(
          "A blog with this title already exists. Please choose a different title."
        );
      } else {
        // Handle other types of errors
        console.log(error);
        alert("An error occurred while creating the blog. Please try again.");
      }
      return;
    }

    if (isSuccessful) {
      setIsClicked(true);
      setTimeout(() => {
        toast.success("Created successfully!");
        setTimeout(() => {
          navigate("/blog-table");
        }, 1200);
      }, 500);
    }
  }

  // Slug generation function
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
      .replace(/^-+|-+$/g, ""); // Trim leading and trailing hyphens
  };

  // Value from title input
  const onChangeTitle = (e) => {
    const newTitle = e.target.value;
    const newSlug = generateSlug(newTitle);
    setBlog({ ...blog, title: newTitle, slug: newSlug });
  };

  // Value from tag select
  const onChangeTag = (e) => {
    setBlog({ ...blog, tag: e.target.value });
  };

  // Value from intro input
  const onChangeIntro = (e) => {
    setBlog({ ...blog, intro: e.target.value });
  };

  // Upload image
  const updateInfoImage = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    try {
      const response = await axios.post(
        `http://localhost:5000/blog/upload`,
        formData,
        {
          ...apiConfig,
          headers: {
            ...apiConfig.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Log the response data to check if the image is uploaded correctly
      setBlog((prevBlog) => ({
        ...prevBlog,
        image: response.data.link, // Ensure that the server is returning the correct URL for the image
      }));
    } catch (error) {
      console.error(error);
    }
    fileInputRef.current = event.target;
  };

  // Remove image
  const removeImage = async (e) => {
    e.preventDefault();
    try {
      // Extract the key from the image URL
      const key = blog.image.split("/").pop();

      await axios.post(`http://localhost:5000/blog/delete`, { key }, apiConfig);

      // Remove the image from the blog state
      setBlog((prevBlog) => ({
        ...prevBlog,
        image: null,
      }));
    } catch (error) {
      console.error(error);
    }
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="content-container create-blog-text-editor">
        <h3>Create new blog</h3>
        <span>
          By: <span className="text-blue-3">{userInfos.fullName}</span>
        </span>
        <div className="text-editor-title">
          <label htmlFor="title">Title:</label>
          <textarea value={blog.title} onChange={onChangeTitle} />
        </div>
        <div className="text-editor-tag">
          <label htmlFor="category">Category:</label>
          <select value={blog.tag} onChange={onChangeTag}>
            <option value="">Select category</option>
            <option value="Children's Health">Children's Health</option>
            <option value="Diet & Food">Diet & Food</option>
            <option value="Exercise & Fitness">Exercise & Fitness</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Parenting">Parenting</option>
            <option value="Pregnancy & Childbirth">
              Pregnacy & Childbirth
            </option>
            <option value="Primary Care">Primary Care</option>
            <option value="Sex & Relationship">Sex & Relationship</option>
            <option value="Wellness">Wellness</option>
            <option value="Women's Care">Women's Care</option>
          </select>
        </div>
        <div className="text-editor-intro">
          <label htmlFor="intro">Introduction:</label>
          <textarea
            className="intro-textarea"
            value={blog.intro}
            onChange={onChangeIntro}
          />
        </div>
        <div className="text-editor-img">
          <label htmlFor="image">Blog image:</label>
          <input
            type="file"
            name="image"
            className="form-control border-primary-subtle col-9 mb-2"
            placeholder="Upload image(s)"
            onChange={(e) => updateInfoImage(e)}
            ref={fileInputRef}
          />
        </div>
        {blog.image ? (
          <div className="text-editor-img">
            <img src={blog.image} alt="Blog img" />
            <button onClick={removeImage} className="border rounded">
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        ) : (
          <div className="pt-2">No image was uploaded</div>
        )}
        <label htmlFor="info">Blog content:</label>
        <div className="text-editor">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>

        <div className="text-editor-btn">
          <Link className="c-2 btn btn-outline-secondary" to="/blog-table">
            Back
          </Link>
          <button
            className="c-2 btn btn-primary"
            onClick={(event) =>
              handleShowModal(
                event,
                "create",
                "Confirm create",
                "Are you sure you want to create this blog?"
              )
            }
          >
            Create
          </button>
        </div>
      </div>
      <Toaster
        toastOptions={{
          className: "toast-noti",
        }}
        richColors
      />
      <ConfirmModal
        title={modalContent.title}
        body={modalContent.body}
        show={showModal}
        hide={handleHideModal}
        action={action}
        isClicked={isClicked}
      />
    </>
  );
};

export default CreateBlog;

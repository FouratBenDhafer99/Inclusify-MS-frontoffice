import React, {useState} from "react";
import Rodal from "rodal";
import PostApi from "../../api/PostApi";
import "./FacebookModal.css"

function CreatePostModal({visible, onClose, user, projectId}) {

    const [postDescription, setPostDescription] = useState('');
    const [postImages, setPostImages] = useState([]);
    const [postData, setPostData] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [postType, setPostType] = useState("Type");
    const [selectedImages, setSelectedImages] = useState([]);


    const handleFileInputChange = (event) => {
        const images = event.target.files;
        setPostImages(images);
        const selectedImagesArray = [];
        for (let i = 0; i < images.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(images[i]);
            reader.onloadend = () => {
                selectedImagesArray.push(reader.result);
                if (selectedImagesArray.length === images.length) {
                    setSelectedImages(selectedImagesArray);
                }
            };
        }
        console.log(selectedImagesArray)
    };

    const handlePrivacyClick = () => {
        setIsActive(true);
    };

    const handleBackClick = () => {
        setIsActive(false);
    };

    const handleDescriptionChange = (event) => {
        setPostDescription(event.target.value);
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('description', postDescription);
        formData.append('user', user._id);
        if (projectId)
            formData.append("project", projectId)
        console.log(postImages);
        for (let i = 0; i < postImages.length; i++) {
            formData.append('images', postImages[i]);
        }

        let data = await PostApi.createPost(formData);
        for (const [key, value] of formData.entries()) {
            console.log(key + ": " + value);
        }
        onClose();
        window.location.reload();
        console.log(data);
    };

    return (
        <Rodal visible={visible} onClose={onClose} animation='slideUp' width={isActive ? 500 : 500}
               height={isActive ? 600 : 530} customStyles={{
            "transition": "height 0.2s ease",
            "top": "0px",
            "bottom": "10%",
            "padding": "0px",
            "borderRadius": "12px"
        }}>
            <div className={`container ${isActive ? "active" : ""}`}
                 style={{paddingLeft: 0, paddingRight: 0, height: "515px"}}>
                <div className="wrapper">
                    <section className="post">
                        <header>Create Post</header>
                        <form action="#" noValidate>
                            <div className="content">
                                <img src="/assets/newsfeedAssets/icons/logo.png" alt="logo"/>
                                <div className="details">
                                    <p style={{marginBottom: 0}}>Minassa</p>
                                    <div className="privacy" onClick={handlePrivacyClick} onMouseEnter={(e) => {
                                        console.log(isActive);
                                    }}>
                                        <i className="fas fa-solid fa-list"/>
                                        <span>{postType}</span>
                                        <i className="fas fa-caret-down"/>
                                    </div>
                                </div>
                            </div>
                            <div className={"d-flex flex-column"} style={{overflow: 'auto'}}>
                            <textarea
                                placeholder="What's on your mind?"
                                spellCheck="false"
                                onChange={handleDescriptionChange}
                                value={postDescription}
                                required
                            />
                                <div className={"d-flex m-1"} style={{minHeight: '60px'}}>
                                    {selectedImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Selected image ${index}`}
                                            style={{width: '60px', height: '60px'}}
                                            className={"p-1"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="theme-emoji">
                                <img src="/assets/newsfeedAssets/icons/theme.svg" alt="theme"/>
                                <img src="/assets/newsfeedAssets/icons/smile.svg" alt="smile"/>
                            </div>
                            <div className="options">
                                <p>Add to Your Post</p>
                                <ul className="list">
                                    <li>
                                        <label htmlFor="image-input">
                                            <img src="/assets/newsfeedAssets/icons/gallery.svg" alt="gallery"/>
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            id="image-input"
                                            onChange={handleFileInputChange}
                                            style={{display: 'none'}}
                                        />
                                    </li>
                                    <li><img src="/assets/newsfeedAssets/icons/tag.svg" alt="gallery"/></li>
                                    <li><img src="/assets/newsfeedAssets/icons/emoji.svg" alt="gallery"/></li>
                                    <li><img src="/assets/newsfeedAssets/icons/mic.svg" alt="gallery"/></li>
                                    <li><img src="/assets/newsfeedAssets/icons/more.svg" alt="gallery"/></li>
                                </ul>
                            </div>
                            <button
                                onClick={handleCreatePost}
                                type="submit"
                                className="text-center style2-input text-white fw-600 bg-current d-lg-block border-0"
                            >Post
                            </button>
                        </form>
                    </section>

                    <section className={"audience"}>
                        <header>
                            <div className="arrow-back" onClick={handleBackClick}><i className="fas fa-arrow-left"/>
                            </div>
                            <p>Select Audience</p>
                        </header>
                        <div className="content">
                            <p>Who can see your post?</p>
                            <span>Your post will show up in News Feed, on your profile and in search results.</span>
                        </div>
                        <ul className="list">
                            <li className="active">
                                <div className="column">
                                    <div className="icon"><i className="fas fa-bullhorn"/></div>
                                    <div className="details">
                                        <p>Announcement</p>
                                        <span>Share an important announcement</span>
                                    </div>
                                </div>
                                <div className="radio"/>
                            </li>
                            <li>
                                <div className="column">
                                    <div className="icon"><i className="fas fa-hand-holding-heart"/></div>
                                    <div className="details">
                                        <p>Project</p>
                                        <span>Share a your project idea and link</span>
                                    </div>
                                </div>
                                <div className="radio"/>
                            </li>
                            <li>
                                <div className="column">
                                    <div className="icon"><i className="fas fa-tasks"/></div>
                                    <div className="details">
                                        <p>Request</p>
                                        <span>Requests here</span>
                                    </div>
                                </div>
                                <div className="radio"/>
                            </li>
                            <li>
                                <div className="column">
                                    <div className="icon"><i className="fas fa-light fa-angry"/></div>
                                    <div className="details">
                                        <p>Complaint</p>
                                        <span>Complain about something</span>
                                    </div>
                                </div>
                                <div className="radio"/>
                            </li>
                            <li>
                                <div className="column">
                                    <div className="icon"><i className="fas fa-video-camera"/></div>
                                    <div className="details">
                                        <p>Livestreaming</p>
                                        <span>Streaming goes here</span>
                                    </div>
                                </div>
                                <div className="radio"/>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </Rodal>
    );
}

export default CreatePostModal
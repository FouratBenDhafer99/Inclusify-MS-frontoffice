import React, {useState, Fragment, useEffect, useCallback} from "react";
import PostApi from "../../api/PostApi";


const ReactOnPost = ({likesNumber, isComment, postId, userId, reacts}) => {

    const [isActive, setActive] = useState(false);
    const toggleActive = () => setActive(!isActive);
    const emojiClass = `${isActive ? " active" : ""}`;
    const [reactNumber, setReactNumber] = useState(likesNumber)
    const [didReact, setDidReact] = useState(false);
    const [selectedReactType, setSelectedReactType] = useState(reacts?.[0]?.reactType || "");

    useEffect(() => {
        if (reacts) {
            for (let i = 0; i < reacts.length; i++) {
                if (reacts[i].user === userId) {
                    setDidReact(true);
                    setSelectedReactType(reacts[i].reactType);
                    break;
                }
            }
        }
    }, [reacts, userId]);

    const reactToPost = async (reactType) => {
        try {
            if (didReact) {
                if (selectedReactType !== reactType) {
                    setDidReact(true);
                } else {
                    setReactNumber((prev) => prev - 1);

                    setTimeout(() => {
                        setSelectedReactType("");
                    }, 100)
                    setDidReact(false);
                }
            } else {
                setReactNumber((prev) => prev + 1);
                setSelectedReactType(reactType);
                setDidReact(true);
            }
            toggleActive();
            await PostApi.createPostReact(postId, userId, reactType);
        } catch (error) {
            console.log(error);
        }
    };

    // const reactToPost = async (reactType) => {
    //     try {
    //         if (didReact) {
    //             if (selectedReactType !== reactType) {
    //                 setDidReact(true);
    //             } else {
    //                 setReactNumber(reactNumber - 1);
    //                 setSelectedReactType("");
    //                 setDidReact(false);
    //             }
    //         } else {
    //             setReactNumber(reactNumber + 1);
    //             setSelectedReactType(reactType)
    //             setDidReact(true);
    //         }
    //         toggleActive();
    //         await PostApi.createPostReact(postId, userId, reactType);
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const reactTypes = {
        applause: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44f/512.webp?raw=1",
            color: "#D69611"
        },
        love: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp",
            color: "#F44235"
        },
        party: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f38a/512.webp",
            color: "#FFC107"
        },
        curious: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp",
            color: "#ffd523"
        },
        sad: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/512.webp",
            color: "#FFE245"
        },
        angry: {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp",
            color: "#FD8A1B"
        }
    };

    const emojis = [
        {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44f/512.webp?raw=1",
            alt: "Applause emoji",
            reactType: "applause"
        },
        {
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp",
            alt: "Love emoji",
            reactType: "love"
        },
        {src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f38a/512.webp", alt: "Party", reactType: "party"},
        {src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp", alt: "Cur emoji", reactType: "curious"},
        {src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/512.webp", alt: "sad emoji", reactType: "sad"},
        {src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp", alt: "angry emoji", reactType: "angry"}
    ];

    const emojiList = emojis.map(({src, alt, reactType}) => (
        <li className="emoji list-inline-item" key={reactType}>
            <img
                src={src}
                alt={alt}
                className={`${reactType === selectedReactType ? " selected" : ""}`}
                onClick={() => {
                    reactToPost(reactType);
                    setSelectedReactType(reactType);
                }}
            />
        </li>
    ));


    return (
        <Fragment>
            <div
                className="emoji-btn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                onMouseEnter={toggleActive}
            >
                {selectedReactType && <img
                    src={reactTypes[selectedReactType]?.src}
                    alt={selectedReactType}
                    className="btn-round-xs font-xss"
                    style={{marginRight: "6px"}}
                />}
                <span
                    className="reacts-text"
                    style={{color: reactTypes[selectedReactType]?.color}}
                >
                {reactNumber}{reactNumber > 1000 ? " K" : " "} Reacts
              </span>
            </div>
            <div className={`emoji-wrap pointer ${emojiClass || 0}`} onMouseLeave={toggleActive}
                 style={isComment ? {bottom: "38px", padding: "3px 9px 4px 9px"} : {padding: "3px 9px 4px 9px"}}
            >
                <ul className="emojis list-inline mb-0">
                    {emojiList}
                </ul>
            </div>
        </Fragment>
    )
}

export default ReactOnPost;
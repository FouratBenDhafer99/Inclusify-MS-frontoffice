import React, { Fragment, useEffect, useState } from "react";
import Appfooter from "../components/Appfooter";
import Popupchat from "../components/Popupchat";

import Createpost from "../components/PostComponents/Createpost";
import Load from "../components/Load";
import Layout from "../components/Layout";
// import { UserContext } from "../index";
import Postview from "../components/PostComponents/Postview";
import PostApi from "../api/PostApi";
import feedApi from "../api/feedApi";

const Home = () => {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const allPosts = await feedApi.getAllPosts();
      console.log(allPosts);
      setPosts(allPosts);
      setIsLoading(false);
    }

    fetchPosts().then(() => {
      console.log("all posts fetched");
    });
  }, []);

  if (!posts) return <Load />;

  return (
    <Fragment>
      <Layout />
      <div className="main-content">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row feed-body">
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                {/* <Createpost user={currentUser}/> */}
                {posts.map((post) => (
                  <div key={post.id} className="post-view" data-id={post.id}>
                    <Postview user={post.user} post={post} />
                  </div>
                ))}
                <Load />
              </div>
              <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0"></div>
            </div>
          </div>
        </div>
      </div>
      <Popupchat />
      <Appfooter />
    </Fragment>
  );
};

export default Home;
